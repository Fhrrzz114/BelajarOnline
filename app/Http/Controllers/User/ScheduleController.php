<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ScheduleController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $schedules = Schedule::where('classroom', $user->classroom)
            ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')")
            ->orderBy('start_time')
            ->get()
            ->groupBy('day');

        return Inertia::render('User/Schedules/Index', [
            'schedules' => $schedules
        ]);
    }

    public function download()
    {
        $user = auth()->user();
        
        $schedules = Schedule::where('classroom', $user->classroom)
            ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')")
            ->orderBy('start_time')
            ->get()
            ->groupBy('day');

        $pdf = Pdf::loadView('pdf.schedule', [
            'user' => $user,
            'schedules' => $schedules
        ]);

        return $pdf->download('Jadwal_Pelajaran_' . str_replace(' ', '_', $user->name) . '.pdf');
    }
}
