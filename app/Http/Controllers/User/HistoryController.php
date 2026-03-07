<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Attendance;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function attendance()
    {
        $attendances = auth()->user()->attendances()
            ->orderBy('date', 'desc')
            ->paginate(15);

        return Inertia::render('User/Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

    public function tasks()
    {
        $user = auth()->user();
        
        // Get tasks for the user's classroom
        $tasks = Task::where('classroom', $user->classroom)
            ->with(['submissions' => function($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->orderBy('due_date', 'desc')
            ->get();

        return Inertia::render('User/Tasks/Index', [
            'tasks' => $tasks
        ]);
    }
}
