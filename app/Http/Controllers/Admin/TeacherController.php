<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = User::where('role', 'admin')->latest()->get();
        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Teachers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return redirect()->route('admin.teacher.index')->with('success', 'Guru berhasil ditambahkan');
    }

    public function edit(User $teacher)
    {
        return Inertia::render('Admin/Teachers/Edit', [
            'teacher' => $teacher
        ]);
    }

    public function update(Request $request, User $teacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$teacher->id,
        ]);

        $teacher->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $teacher->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('admin.teacher.index')->with('success', 'Data guru berhasil diperbarui');
    }

    public function destroy(User $teacher)
    {
        // Prevent self-deletion
        if ($teacher->id === auth()->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri');
        }

        $teacher->delete();
        return redirect()->route('admin.teacher.index')->with('success', 'Guru berhasil dihapus');
    }
}
