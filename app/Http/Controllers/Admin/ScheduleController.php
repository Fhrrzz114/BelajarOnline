<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\User;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $classrooms = User::where('role', 'user')->whereNotNull('classroom')->distinct()->pluck('classroom');
        if ($classrooms->isEmpty()) {
            $classrooms = collect(['1', '2', '3', '4', '5', '6']);
        }
        
        $selectedClassroom = $request->input('classroom', $classrooms->first());

        $schedules = Schedule::where('classroom', $selectedClassroom)
            ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat')")
            ->orderBy('start_time')
            ->get()
            ->groupBy('day');

        $bankMapel = \App\Models\Course::with('user')->latest()->get();

        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => $schedules,
            'classrooms' => $classrooms,
            'selectedClassroom' => $selectedClassroom,
            'bankMapel' => $bankMapel,
        ]);
    }

    public function create()
    {
        $teachers = User::where('role', 'admin')->get();

        return Inertia::render('Admin/Schedules/Create', [
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        \App\Models\Course::create([
            'title' => $validated['subject'],
            'user_id' => $validated['user_id'],
        ]);

        return redirect()->route('admin.schedules.index')
            ->with('success', 'Mata Pelajaran berhasil ditambahkan ke Bank Mapel.');
    }

    public function generate(Request $request)
    {
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
        
        $classrooms = User::whereNotNull('classroom')->distinct()->pluck('classroom')->toArray();
        if (empty($classrooms)) {
            $classrooms = ['1', '2', '3', '4', '5', '6'];
        }
        
        // Define Slots as per user request
        $slots = [
            ['name' => 'Mapel 1', 'start' => '07:30', 'end' => '09:00'],
            ['name' => 'Istirahat', 'start' => '09:00', 'end' => '09:30', 'type' => 'break'],
            ['name' => 'Mapel 2', 'start' => '09:30', 'end' => '10:45'],
            ['name' => 'Mapel 3', 'start' => '10:45', 'end' => '12:00'],
        ];

        // Fetch all courses with their teachers (admin users who have courses)
        $courses = \App\Models\Course::join('users', 'courses.user_id', '=', 'users.id')
            ->select('courses.*', 'users.name as teacher_name', 'users.id as teacher_id')
            ->get();

        if ($courses->isEmpty()) {
            return redirect()->back()->with('error', 'Silakan input Mapel (Courses) dan Gurunya terlebih dahulu.');
        }

        // Clear existing schedules for these classrooms to start fresh
        Schedule::whereIn('classroom', $classrooms)->delete();

        foreach ($days as $day) {
            $isFriday = $day === 'Jumat';
            foreach ($slots as $slot) {
                // Friday limit: only 2 subjects (skip Mapel 3)
                if ($isFriday && $slot['name'] === 'Mapel 3') {
                    continue;
                }

                if (isset($slot['type']) && $slot['type'] === 'break') {
                    foreach ($classrooms as $classroom) {
                        Schedule::create([
                            'classroom' => $classroom,
                            'day' => $day,
                            'subject' => 'Istirahat',
                            'start_time' => $slot['start'],
                            'end_time' => $slot['end'],
                            'teacher_name' => '-',
                        ]);
                    }
                    continue;
                }

                $assignedTeachers = [];
                $availableCourses = $courses->shuffle();

                foreach ($classrooms as $classroom) {
                    // Try to find a course where the teacher is not already teaching in this slot
                    $selectedCourse = $availableCourses->first(function ($course) use ($assignedTeachers) {
                        return !in_array($course->teacher_id, $assignedTeachers);
                    });

                    if ($selectedCourse) {
                        Schedule::create([
                            'classroom' => $classroom,
                            'day' => $day,
                            'subject' => $selectedCourse->title,
                            'start_time' => $slot['start'],
                            'end_time' => $slot['end'],
                            'teacher_name' => $selectedCourse->teacher_name,
                        ]);
                        $assignedTeachers[] = $selectedCourse->teacher_id;
                        
                        // Optional: remove from available if you want variety, but it might lead to running out of teachers
                        // For now we keep teachers available for other classes in OTHER slots.
                    } else {
                        // Conflict or no courses left
                        Schedule::create([
                            'classroom' => $classroom,
                            'day' => $day,
                            'subject' => 'Menunggu Guru',
                            'start_time' => $slot['start'],
                            'end_time' => $slot['end'],
                            'teacher_name' => '-',
                        ]);
                    }
                }
            }
        }

        return redirect()->route('admin.schedules.index')->with('success', 'Jadwal otomatis Kelas 1-6 berhasil dibuat.');
    }

    public function destroy(Schedule $schedule)
    {
        $classroom = $schedule->classroom;
        $schedule->delete();

        return redirect()->route('admin.schedules.index', ['classroom' => $classroom])
            ->with('success', 'Jadwal berhasil dihapus.');
    }

    public function download($classroom)
    {
        $schedules = Schedule::where('classroom', $classroom)
            ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat')")
            ->orderBy('start_time')
            ->get()
            ->groupBy('day');

        $pdf = Pdf::loadView('admin.schedules.pdf', [
            'schedules' => $schedules,
            'classroom' => $classroom
        ]);

        return $pdf->download("Jadwal_Pelajaran_Kelas_{$classroom}.pdf");
    }

    public function destroyCourse($id)
    {
        \App\Models\Course::findOrFail($id)->delete();
        return redirect()->route('admin.schedules.index')
            ->with('success', 'Mata Pelajaran dihapus dari Bank.');
    }
}
