<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Attendance;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Models\Schedule;
use App\Models\ExamGrade;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function adminIndex()
    {
        $stats = [
            'total_students' => User::where('role', 'user')->count(),
            'total_teachers' => User::where('role', 'admin')->count(),
            'active_classes' => User::where('role', 'user')->whereNotNull('classroom')->distinct()->count('classroom'),
            'today_attendance' => Attendance::where('date', Carbon::today()->toDateString())->count(),
        ];

        $recent_submissions = TaskSubmission::with(['user', 'task'])
            ->latest()
            ->take(5)
            ->get();

        $recent_attendance = Attendance::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_submissions' => $recent_submissions,
            'recent_attendance' => $recent_attendance,
        ]);
    }

    public function userIndex(Request $request)
    {
        $user = $request->user();
        
        $total_tasks = Task::where('classroom', $user->classroom)->count();
        $submitted_tasks = TaskSubmission::where('user_id', $user->id)->count();
        
        $upcoming_tasks = Task::where('classroom', $user->classroom)
            ->where('due_date', '>=', Carbon::today()->toDateString())
            ->whereDoesntHave('submissions', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->orderBy('due_date', 'asc')
            ->take(3)
            ->get();

        $day_map = [
            0 => 'Minggu',
            1 => 'Senin',
            2 => 'Selasa',
            3 => 'Rabu',
            4 => 'Kamis',
            5 => 'Jumat',
            6 => 'Sabtu',
        ];
        $today_day = $day_map[Carbon::now()->dayOfWeek];

        $today_schedule = Schedule::where('classroom', $user->classroom)
            ->where('day', $today_day)
            ->orderBy('start_time')
            ->get();

        $recent_grades = TaskSubmission::with('task')
            ->where('user_id', $user->id)
            ->whereNotNull('score')
            ->latest()
            ->take(3)
            ->get();

        $attendance_count = Attendance::where('user_id', $user->id)->count();

        return Inertia::render('User/Dashboard', [
            'stats' => [
                'total_tasks' => $total_tasks,
                'submitted_tasks' => $submitted_tasks,
                'attendance_count' => $attendance_count,
            ],
            'upcoming_tasks' => $upcoming_tasks,
            'today_schedule' => $today_schedule,
            'recent_grades' => $recent_grades,
        ]);
    }
}
