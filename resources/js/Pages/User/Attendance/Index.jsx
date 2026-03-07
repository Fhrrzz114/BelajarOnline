import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, attendances }) {
    const stats = {
        total: attendances.total,
        hadir: attendances.data.filter(a => a.status === 'hadir').length,
        izin: attendances.data.filter(a => a.status === 'izin').length,
        sakit: attendances.data.filter(a => a.status === 'sakit').length,
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'hadir': return 'bg-green-100 text-green-700 border-green-200';
            case 'izin': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'sakit': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'alpa': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Riwayat Absensi</h2>}
        >
            <Head title="Riwayat Absensi" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Rekam', value: stats.total, color: 'indigo', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
                            { label: 'Hadir', value: stats.hadir, color: 'emerald', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> },
                            { label: 'Izin', value: stats.izin, color: 'blue', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                            { label: 'Sakit', value: stats.sakit, color: 'orange', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{stat.label}</p>
                                    <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-800">Tabel Riwayat Absensi</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white border-b border-gray-50">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Masuk</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Keluar</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {attendances.data.length > 0 ? attendances.data.map((attendance) => (
                                        <tr key={attendance.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-gray-800 text-sm">
                                                {new Date(attendance.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600 font-mono">
                                                {attendance.time_in || '--:--'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600 font-mono">
                                                {attendance.time_out || '--:--'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusColor(attendance.status)} uppercase tracking-wider`}>
                                                    {attendance.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-xs text-gray-400 italic font-medium">{attendance.note || '-'}</div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">Belum ada riwayat absensi.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {attendances.last_page > 1 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {attendances.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${link.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
