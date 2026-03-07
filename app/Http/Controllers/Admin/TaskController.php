<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Exports\TaskGradesExport;
use Maatwebsite\Excel\Facades\Excel;

class TaskController extends Controller
{
    public function getSubjects(Request $request)
    {
        $classroom = $request->query('classroom');
        if (!$classroom) return response()->json([]);

        $subjects = Schedule::where('classroom', $classroom)
            ->distinct()
            ->pluck('subject');

        return response()->json($subjects);
    }

    public function export(Task $task)
    {
        return Excel::download(new TaskGradesExport($task), 'Nilai_Tugas_' . str_replace(' ', '_', $task->title) . '.xlsx');
    }

    public function index()
    {
        $tasks = Task::with('user')
            ->orderBy('due_date', 'asc')
            ->paginate(10);

        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function create()
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');

        return Inertia::render('Admin/Tasks/Create', [
            'classrooms' => $classrooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string',
            'description' => 'nullable|string',
            'classroom' => 'required|string',
            'due_date' => 'required|date',
            'file' => 'nullable|file|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('tasks', 'public');
        }

        $request->user()->tasks()->create($validated);

        return redirect()->route('admin.task.index')->with('success', 'Tugas PR berhasil dibuat.');
    }

    public function edit(Task $task)
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');

        return Inertia::render('Admin/Tasks/Edit', [
            'task' => $task,
            'classrooms' => $classrooms
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string',
            'description' => 'nullable|string',
            'classroom' => 'required|string',
            'due_date' => 'required|date',
            'file' => 'nullable|file|max:5120',
        ]);

        if ($request->hasFile('file')) {
            if ($task->file_path) {
                Storage::disk('public')->delete($task->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('tasks', 'public');
        }

        $task->update($validated);

        return redirect()->route('admin.task.index')->with('success', 'Tugas PR berhasil diperbarui.');
    }

    public function destroy(Task $task)
    {
        if ($task->file_path) {
            Storage::disk('public')->delete($task->file_path);
        }
        $task->delete();

        return back()->with('success', 'Tugas PR berhasil dihapus.');
    }

    public function show(Task $task)
    {
        $task->load(['user', 'submissions.user']);

        return Inertia::render('Admin/Tasks/Show', [
            'task' => $task
        ]);
    }
}
