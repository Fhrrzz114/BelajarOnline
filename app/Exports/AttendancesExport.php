<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AttendancesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Attendance::with('user')->orderBy('date', 'desc')->get();
    }

    public function headings(): array
    {
        return [
            'Nama Siswa',
            'NISN',
            'Kelas',
            'Tanggal',
            'Jam Masuk',
            'Jam Keluar',
            'Status',
            'Keterangan',
        ];
    }

    public function map($attendance): array
    {
        return [
            $attendance->user->name,
            $attendance->user->nisn,
            $attendance->user->classroom,
            $attendance->date,
            $attendance->time_in,
            $attendance->time_out,
            $attendance->status,
            $attendance->note,
        ];
    }
}
