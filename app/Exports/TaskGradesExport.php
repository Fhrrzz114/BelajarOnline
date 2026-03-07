<?php

namespace App\Exports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TaskGradesExport implements FromCollection, WithHeadings, WithMapping
{
    protected $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->task->submissions()->with('user')->get();
    }

    public function headings(): array
    {
        return [
            'Nama Siswa',
            'NISN',
            'Kelas',
            'Nilai',
            'Feedback',
            'Tanggal Dikumpul',
        ];
    }

    public function map($submission): array
    {
        return [
            $submission->user->name,
            $submission->user->nisn,
            $submission->user->classroom,
            $submission->score,
            $submission->feedback,
            $submission->created_at->format('d/m/Y H:i'),
        ];
    }
}
