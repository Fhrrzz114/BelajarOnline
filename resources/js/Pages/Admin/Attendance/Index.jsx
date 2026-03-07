import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const StatusBadge = ({ status }) => {
    const styles = {
        present: 'bg-green-50 text-green-700 border-green-100',
        late: 'bg-amber-50 text-amber-700 border-amber-100',
        sick: 'bg-blue-50 text-blue-700 border-blue-100',
        permission: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        absent: 'bg-red-50 text-red-700 border-red-100',
    };

    const labels = {
        present: 'Tepat Waktu',
        late: 'Terlambat',
        sick: 'Sakit',
        permission: 'Izin',
        absent: 'Alpa',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default function Index({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Log Absensi Harian"
        >
            <Head title="Log Absensi" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Riwayat Kehadiran</h2>
                        <p className="text-sm text-gray-500">Daftar absensi siswa yang tercatat hari ini.</p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href={route('admin.attendance.export')}
                            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Ekspor Ke Excel
                        </a>
                        <Link
                            href={route('admin.attendance.scanner')}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            Buka Scanner
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Siswa</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Kelas</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Jam Masuk</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {attendances.data.map((attendance) => (
                                <tr key={attendance.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                {attendance.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{attendance.user.name}</div>
                                                <div className="text-xs text-gray-400">NISN: {attendance.user.nisn}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                                            {attendance.user.classroom || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600 font-mono">
                                        {attendance.time_in}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={attendance.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {new Date(attendance.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
