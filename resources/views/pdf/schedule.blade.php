<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Jadwal Pelajaran - {{ $user->name }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            line-height: 1.5;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #edeff2;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #4f46e5;
            font-size: 24px;
        }
        .student-info {
            margin-bottom: 30px;
            background: #f9fafb;
            padding: 20px;
            border-radius: 10px;
        }
        .student-info table {
            width: 100%;
        }
        .student-info td {
            padding: 5px 0;
            font-size: 14px;
        }
        .student-info .label {
            font-weight: bold;
            width: 100px;
            color: #6b7280;
        }
        .schedule-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .schedule-table th {
            background-color: #4f46e5;
            color: white;
            text-align: left;
            padding: 12px 15px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .schedule-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #edeff2;
            font-size: 13px;
        }
        .day-row {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #4f46e5;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 10px;
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>JADWAL PELAJARAN</h1>
        <p>SmartStudy E-Learning Platform</p>
    </div>

    <div class="student-info">
        <table>
            <tr>
                <td class="label">Nama</td>
                <td>: {{ $user->name }}</td>
                <td class="label">Kelas</td>
                <td>: {{ $user->classroom }}</td>
            </tr>
            <tr>
                <td class="label">NISN</td>
                <td>: {{ $user->nisn ?? '-' }}</td>
                <td class="label">Tgl Cetak</td>
                <td>: {{ date('d/m/Y') }}</td>
            </tr>
        </table>
    </div>

    <table class="schedule-table">
        <thead>
            <tr>
                <th>Waktu</th>
                <th>Mata Pelajaran</th>
                <th>Guru Pengajar</th>
            </tr>
        </thead>
        <tbody>
            @foreach(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] as $day)
                @if(isset($schedules[$day]) && count($schedules[$day]) > 0)
                    <tr class="day-row">
                        <td colspan="3">{{ $day }}</td>
                    </tr>
                    @foreach($schedules[$day] as $s)
                        <tr>
                            <td>{{ substr($s->start_time, 0, 5) }} - {{ substr($s->end_time, 0, 5) }}</td>
                            <td><strong>{{ $s->subject }}</strong></td>
                            <td>{{ $s->teacher_name ?? '-' }}</td>
                        </tr>
                    @endforeach
                @endif
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Dokumen ini dibuat secara otomatis oleh sistem SmartStudy pada {{ date('d/m/Y H:i') }}</p>
    </div>
</body>
</html>
