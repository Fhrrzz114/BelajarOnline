<!DOCTYPE html>
<html>
<head>
    <title>Jadwal Pelajaran Kelas {{ $classroom }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            line-height: 1.5;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            color: #4f46e5;
            font-size: 24px;
            text-transform: uppercase;
        }
        .header p {
            margin: 5px 0 0;
            font-weight: bold;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            table-layout: fixed;
        }
        th, td {
            border: 1px solid #e2e8f0;
            padding: 12px 8px;
            text-align: center;
            font-size: 11px;
            word-wrap: break-word;
        }
        th {
            background-color: #f8fafc;
            color: #4f46e5;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .day-column {
            background-color: #f1f5f9;
            font-weight: bold;
            width: 80px;
        }
        .time-text {
            font-size: 9px;
            color: #64748b;
            display: block;
            margin-bottom: 4px;
        }
        .subject-text {
            font-weight: bold;
            color: #1e293b;
            font-size: 11px;
        }
        .teacher-text {
            font-size: 9px;
            color: #94a3b8;
            margin-top: 2px;
        }
        .break {
            background-color: #f8fafc;
            color: #94a3b8;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 10px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Jadwal Pelajaran</h1>
        <p>Kelas: {{ $classroom }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 100px;">Hari</th>
                <th>Sesi 1</th>
                <th>Istirahat</th>
                <th>Sesi 2</th>
                <th>Sesi 3</th>
            </tr>
        </thead>
        <tbody>
            @foreach(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as $day)
                <tr>
                    <td class="day-column">{{ $day }}</td>
                    @php
                        $daySchedules = $schedules->get($day, collect());
                        $sessions = [
                            '07:30' => null,
                            '09:00' => null,
                            '09:30' => null,
                            '10:45' => null
                        ];
                        foreach($daySchedules as $s) {
                            $sessions[$s->start_time] = $s;
                        }
                    @endphp

                    {{-- Sesi 1 (07:30) --}}
                    <td>
                        @if($sessions['07:30'])
                            <span class="time-text">07:30 - 09:00</span>
                            <div class="subject-text">{{ $sessions['07:30']->subject }}</div>
                            <div class="teacher-text">{{ $sessions['07:30']->teacher_name }}</div>
                        @else
                            -
                        @endif
                    </td>

                    {{-- Istirahat (09:00) --}}
                    <td class="break">
                        @if($sessions['09:00'])
                            ISTIRAHAT
                        @else
                            -
                        @endif
                    </td>

                    {{-- Sesi 2 (09:30) --}}
                    <td>
                        @if($sessions['09:30'])
                            <span class="time-text">09:30 - 10:45</span>
                            <div class="subject-text">{{ $sessions['09:30']->subject }}</div>
                            <div class="teacher-text">{{ $sessions['09:30']->teacher_name }}</div>
                        @else
                            -
                        @endif
                    </td>

                    {{-- Sesi 3 (10:45) --}}
                    <td>
                        @if($day !== 'Jumat' && $sessions['10:45'])
                            <span class="time-text">10:45 - 12:00</span>
                            <div class="subject-text">{{ $sessions['10:45']->subject }}</div>
                            <div class="teacher-text">{{ $sessions['10:45']->teacher_name }}</div>
                        @elseif($day === 'Jumat')
                            <span style="color: #cbd5e1; font-size: 9px;">-</span>
                        @else
                            -
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak pada: {{ now()->format('d/m/Y H:i') }}
    </div>
</body>
</html>
