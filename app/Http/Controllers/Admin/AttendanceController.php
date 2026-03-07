<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Exports\AttendancesExport;
use Maatwebsite\Excel\Facades\Excel;

class AttendanceController extends Controller
{
    public function export()
    {
        return Excel::download(new AttendancesExport, 'Data_Absensi_Siswa_' . date('Y-m-d') . '.xlsx');
    }

    public function index()
    {
        $attendances = Attendance::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

    public function scanner()
    {
        return Inertia::render('Admin/Attendance/Scanner');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nisn' => 'required|string',
        ]);

        $user = User::where('nisn', $request->nisn)->first();

        if (!$user) {
            return back()->with('error', 'Siswa dengan NISN tersebut tidak ditemukan.');
        }

        $today = Carbon::today()->toDateString();
        $now = Carbon::now();

        $existing = Attendance::where('user_id', $user->id)
            ->where('date', $today)
            ->first();

        if ($existing) {
            return back()->with('error', "{$user->name} sudah melakukan absensi hari ini pada {$existing->time_in}.");
        }

        Attendance::create([
            'user_id' => $user->id,
            'date' => $today,
            'time_in' => $now->toTimeString(),
            'status' => $this->determineStatus($now),
        ]);

        return back()->with('success', "Absensi berhasil dicatat untuk {$user->name}.");
    }

    private function determineStatus($time)
    {
        $limit = Carbon::today()->setHour(7)->setMinute(0);
        return $time->gt($limit) ? 'late' : 'present';
    }
}
