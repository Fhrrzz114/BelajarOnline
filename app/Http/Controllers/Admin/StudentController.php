<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Imports\StudentsImport;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return redirect()->route('admin.student.index')->with('success', 'Data siswa berhasil diimpor.');
    }

    public function downloadTemplate()
    {
        $headers = ['nama', 'email', 'nisn', 'kelas', 'password'];
        
        $callback = function() use ($headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            fclose($file);
        };
        
        return response()->stream($callback, 200, [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=template_siswa.csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ]);
    }

    public function index(Request $request)
    {
        $query = User::where('role', 'user');

        if ($request->has('classroom') && $request->classroom != '') {
            $query->where('classroom', $request->classroom);
        }

        $students = $query->latest()->get();
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'classrooms' => $classrooms,
            'filters' => $request->only(['classroom'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    public function store(Request $request)
    {
       $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users',
        'nisn' => 'required|string|max:20|unique:users',
        'classroom' => 'nullable|string|max:50',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
       ]);

       User::create([
        'name' => $request->name,
        'email' => $request->email,
        'nisn' => $request->nisn,
        'classroom' => $request->classroom,
        'password' => Hash::make($request->password),
        'role' => 'user'
       ]);

       return redirect()->route('admin.student.index')->with('success', 'Student created successfully');
    }

    public function show(User $user)
    {
    }

    public function edit(User $student)
    {
       return Inertia::render('Admin/Students/Edit', [
        'student' => $student
       ]);
    }

    public function update(Request $request, User $student)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$student->id,
            'nisn' => 'required|string|max:20|unique:users,nisn,'.$student->id,
            'classroom' => 'nullable|string|max:50',
        ]);

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'nisn' => $request->nisn,
            'classroom' => $request->classroom,
        ]);

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $student->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('admin.student.index')->with('success', 'Student updated successfully');
    }

    public function destroy(User $student)
    {
        $student->delete();
        return redirect()->route('admin.student.index')->with('success', 'Student deleted successfully');
    }

    public function promotePage(Request $request)
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        $students = [];

        if ($request->classroom) {
            $students = User::where('role', 'user')
                ->where('classroom', $request->classroom)
                ->orderBy('name')
                ->get();
        }

        return Inertia::render('Admin/Students/Promote', [
            'classrooms' => $classrooms,
            'students' => $students,
            'filters' => $request->only(['classroom'])
        ]);
    }

    public function bulkPromote(Request $request)
    {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:users,id',
            'target_classroom' => 'required|string|max:50',
        ]);

        User::whereIn('id', $request->student_ids)
            ->update(['classroom' => $request->target_classroom]);

        return redirect()->route('admin.student.index')->with('success', 'Siswa berhasil dinaikkan ke kelas ' . $request->target_classroom);
    }
}
