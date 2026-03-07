<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamGrade;
use App\Models\User;
use App\Models\Schedule;
use Inertia\Inertia;

class ExamGradeController extends Controller
{
    public function index(Request $request)
    {
        $query = ExamGrade::with('user');

        if ($request->classroom) {
            $query->where('classroom', $request->classroom);
        }

        if ($request->subject) {
            $query->where('subject', $request->subject);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        $grades = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        $subjects = Schedule::distinct()->pluck('subject');

        return Inertia::render('Admin/ExamGrades/Index', [
            'grades' => $grades,
            'filters' => $request->only(['classroom', 'subject', 'type']),
            'classrooms' => $classrooms,
            'subjects' => $subjects
        ]);
    }

    public function create(Request $request)
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        
        $students = [];
        if ($request->classroom) {
            $students = User::where('role', 'user')
                ->where('classroom', $request->classroom)
                ->orderBy('name')
                ->get();
        }

        $subjects = [];
        if ($request->classroom) {
            $subjects = Schedule::where('classroom', $request->classroom)
                ->distinct()
                ->pluck('subject');
        }

        return Inertia::render('Admin/ExamGrades/Create', [
            'classrooms' => $classrooms,
            'students' => $students,
            'subjects' => $subjects,
            'filters' => $request->only(['classroom', 'subject', 'type', 'academic_year', 'semester'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'classroom' => 'required|string',
            'subject' => 'required|string',
            'type' => 'required|in:UTS,UAS',
            'academic_year' => 'required|string',
            'semester' => 'required|in:Ganjil,Genap',
            'grades' => 'required|array',
            'grades.*.user_id' => 'required|exists:users,id',
            'grades.*.score' => 'required|integer|min:0|max:100',
        ]);

        foreach ($request->grades as $gradeData) {
            // Skip if score is null or not set (though validation says required, UI might send empty strings)
            if ($gradeData['score'] === '' || $gradeData['score'] === null) continue;

            ExamGrade::updateOrCreate(
                [
                    'user_id' => $gradeData['user_id'],
                    'subject' => $request->subject,
                    'type' => $request->type,
                    'academic_year' => $request->academic_year,
                    'semester' => $request->semester,
                ],
                [
                    'score' => $gradeData['score'],
                    'classroom' => $request->classroom,
                ]
            );
        }

        return redirect()->route('admin.exam-grade.index')->with('success', 'Nilai ujian berhasil disimpan.');
    }

    public function destroy(ExamGrade $examGrade)
    {
        $examGrade->delete();
        return back()->with('success', 'Nilai berhasil dihapus.');
    }
}
