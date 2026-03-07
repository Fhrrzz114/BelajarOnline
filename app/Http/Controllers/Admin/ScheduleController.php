<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\User;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        
        $selectedClassroom = $request->input('classroom', $classrooms->first());

        $schedules = Schedule::where('classroom', $selectedClassroom)
            ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')")
            ->orderBy('start_time')
            ->get()
            ->groupBy('day');

        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => $schedules,
            'classrooms' => $classrooms,
            'selectedClassroom' => $selectedClassroom,
        ]);
    }

    public function create()
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

        return Inertia::render('Admin/Schedules/Create', [
            'classrooms' => $classrooms,
            'days' => $days
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'classroom' => 'required|string',
            'day' => 'required|string',
            'subject' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
            'teacher_name' => 'nullable|string',
        ]);

        Schedule::create($validated);

        return redirect()->route('admin.schedules.index', ['classroom' => $validated['classroom']])
            ->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function destroy(Schedule $schedule)
    {
        $classroom = $schedule->classroom;
        $schedule->delete();

        return redirect()->route('admin.schedules.index', ['classroom' => $classroom])
            ->with('success', 'Jadwal berhasil dihapus.');
    }
}
