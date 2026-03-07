<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Models\ExamGrade;
use App\Models\Schedule;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // 1. Get all unique subjects for this classroom from schedules, normalized
        $subjects = Schedule::where('classroom', $user->classroom)
            ->distinct()
            ->pluck('subject')
            ->map(fn($s) => strtoupper(trim($s)))
            ->unique()
            ->toArray();

        // 2. Get all tasks for this classroom and their submissions for this user
        $tasks = Task::where('classroom', $user->classroom)->get();
        $taskIds = $tasks->pluck('id');
        
        $submissions = TaskSubmission::where('user_id', $user->id)
            ->whereIn('task_id', $taskIds)
            ->whereNotNull('score')
            ->get()
            ->groupBy('task_id');

        // 3. Get all exam grades for this user, normalized grouping
        $examGradesData = ExamGrade::where('user_id', $user->id)->get();
        $examGrades = [];
        foreach ($examGradesData as $eg) {
            $key = strtoupper(trim($eg->subject));
            if (!isset($examGrades[$key])) {
                $examGrades[$key] = collect();
            }
            $examGrades[$key]->push($eg);
        }

        $report = [];
        $processedTaskIds = [];

        // Loop through subjects from schedules
        foreach ($subjects as $subjectName) {
            $subjectTasks = $tasks->filter(function($t) use ($subjectName) {
                return strtoupper(trim($t->subject)) === $subjectName;
            });

            $taskScores = [];
            foreach ($subjectTasks as $st) {
                if (isset($submissions[$st->id])) {
                    $taskScores[] = $submissions[$st->id][0]->score;
                    $processedTaskIds[] = $st->id;
                }
            }

            $subjectExams = isset($examGrades[$subjectName]) ? $examGrades[$subjectName] : collect();
            $uts = $subjectExams->where('type', 'UTS')->first();
            $uas = $subjectExams->where('type', 'UAS')->first();

            $examScores = [];
            if ($uts) $examScores[] = $uts->score;
            if ($uas) $examScores[] = $uas->score;

            $allScores = array_merge($taskScores, $examScores);
            $average = count($allScores) > 0 ? array_sum($allScores) / count($allScores) : 0;

            $report[] = [
                'subject' => $subjectName,
                'task_count' => count($taskScores),
                'task_avg' => count($taskScores) > 0 ? array_sum($taskScores) / count($taskScores) : 0,
                'uts' => $uts ? $uts->score : null,
                'uas' => $uas ? $uas->score : null,
                'final_avg' => round($average, 2),
                'status' => $average >= 75 ? 'Lulus' : (count($allScores) > 0 ? 'Remedi' : 'N/A')
            ];
        }

        // Handle tasks that don't match any subject from schedules
        $remainingTasks = $tasks->reject(function($t) use ($processedTaskIds) {
            return in_array($t->id, $processedTaskIds);
        });

        $remainingGroups = $remainingTasks->groupBy(function($t) {
            return strtoupper(trim($t->subject ?: 'TUGAS UMUM'));
        });

        foreach ($remainingGroups as $unmatchedSubject => $groupTasks) {
            $unmatchedScores = [];
            foreach ($groupTasks as $gt) {
                if (isset($submissions[$gt->id])) {
                    $unmatchedScores[] = $submissions[$gt->id][0]->score;
                }
            }

            if (count($unmatchedScores) > 0) {
                $unmatchedAvg = array_sum($unmatchedScores) / count($unmatchedScores);
                
                // Get exam grades for this unmatched subject if they exist
                $subjectExams = isset($examGrades[$unmatchedSubject]) ? $examGrades[$unmatchedSubject] : collect();
                $uts = $subjectExams->where('type', 'UTS')->first();
                $uas = $subjectExams->where('type', 'UAS')->first();

                $examScores = [];
                if ($uts) $examScores[] = $uts->score;
                if ($uas) $examScores[] = $uas->score;

                $allScores = array_merge($unmatchedScores, $examScores);
                $average = count($allScores) > 0 ? array_sum($allScores) / count($allScores) : 0;

                $report[] = [
                    'subject' => $unmatchedSubject,
                    'task_count' => count($unmatchedScores),
                    'task_avg' => $unmatchedAvg,
                    'uts' => $uts ? $uts->score : null,
                    'uas' => $uas ? $uas->score : null,
                    'final_avg' => round($average, 2),
                    'status' => $average >= 75 ? 'Lulus' : 'Remedi',
                    'is_unmatched' => true
                ];
            }
        }

        return Inertia::render('User/Grades/Index', [
            'report' => $report
        ]);
    }
}
