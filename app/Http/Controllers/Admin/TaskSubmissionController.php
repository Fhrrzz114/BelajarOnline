<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaskSubmission;
use App\Models\Task;
use Illuminate\Support\Facades\Storage;

class TaskSubmissionController extends Controller
{
    public function store(Request $request, Task $task)
    {
        $user = $request->user();

        // Ensure student is in the correct classroom
        if ($user->classroom !== $task->classroom) {
            abort(403, 'Anda tidak terdaftar di kelas untuk tugas ini.');
        }

        $validated = $request->validate([
            'file' => 'required|file|max:5120', // Max 5MB
        ]);

        // Check for existing submission
        $submission = TaskSubmission::where('task_id', $task->id)
            ->where('user_id', $user->id)
            ->first();

        // Don't allow re-submit if already graded
        if ($submission && $submission->score !== null) {
            return back()->with('error', 'Tugas sudah dinilai dan tidak dapat diubah.');
        }

        if ($request->hasFile('file')) {
            if ($submission && $submission->file_path) {
                Storage::disk('public')->delete($submission->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('submissions', 'public');
        }

        TaskSubmission::updateOrCreate(
            ['task_id' => $task->id, 'user_id' => $user->id],
            [
                'file_path' => $validated['file_path'],
                'status' => 'submitted',
                'updated_at' => now()
            ]
        );

        return back()->with('success', 'Tugas berhasil dikumpulkan.');
    }

    public function update(Request $request, TaskSubmission $submission)
    {
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:100',
            'feedback' => 'nullable|string',
        ]);

        $submission->update([
            'score' => $validated['score'],
            'feedback' => $validated['feedback'],
            'status' => 'graded',
            'graded_at' => now(),
        ]);

        return back()->with('success', 'Nilai berhasil disimpan.');
    }

    public function aiGrade(TaskSubmission $submission, \App\Services\GeminiService $gemini)
    {
        $task = $submission->task;
        $filePath = storage_path('app/public/' . $submission->file_path);

        \Illuminate\Support\Facades\Log::info('AI Grading Request Started', [
            'submission_id' => $submission->id,
            'student' => $submission->user->name,
            'task' => $task->title
        ]);

        if (!file_exists($filePath)) {
            \Illuminate\Support\Facades\Log::warning('AI Grading Failed - File not found', ['path' => $filePath]);
            return back()->with('error', 'File tugas tidak ditemukan.');
        }

        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        $content = '';

        if (in_array(strtolower($extension), ['txt', 'md', 'html'])) {
            $content = file_get_contents($filePath);
            \Illuminate\Support\Facades\Log::debug('AI Grading - File Content Extracted', ['length' => strlen($content)]);
        } else {
            \Illuminate\Support\Facades\Log::warning('AI Grading Failed - Unsupported file format', ['extension' => $extension]);
            return back()->with('error', 'Format file .' . $extension . ' belum didukung untuk deteksi AI. Gunakan format .txt sementara ini.');
        }

        if (empty(trim($content))) {
            \Illuminate\Support\Facades\Log::warning('AI Grading Failed - Empty content');
            return back()->with('error', 'Isi file kosong.');
        }

        $result = $gemini->generateGrading($task->title, $task->description, $content);

        if ($result['success']) {
            \Illuminate\Support\Facades\Log::info('AI Grading Success', [
                'submission_id' => $submission->id,
                'score' => $result['score']
            ]);

            $submission->update([
                'score' => $result['score'],
                'feedback' => '[AI Generated] ' . $result['feedback'],
                'status' => 'graded',
                'graded_at' => now(),
            ]);

            return back()->with('success', 'Penilaian AI berhasil dilakukan.');
        }

        \Illuminate\Support\Facades\Log::error('AI Grading Failed - Gemini Service Error', ['message' => $result['message']]);
        return back()->with('error', $result['message']);
    }
}
