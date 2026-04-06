import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const StatusBadge = ({ status }) => {
    const styles = {
        present: 'bg-cyan-50 text-cyan-700 border-cyan-100',
        late: 'bg-rose-50 text-rose-700 border-rose-100',
        sick: 'bg-violet-50 text-violet-700 border-violet-100',
        permission: 'bg-slate-50 text-slate-700 border-slate-100',
        absent: 'bg-slate-900 text-white border-slate-800',
    };

    const labels = {
        present: 'ON TIME',
        late: 'LATE',
        sick: 'SICK',
        permission: 'PERMISSION',
        absent: 'ABSENT',
    };

    return (
        <span className={`px-3 py-1.5 rounded text-[10px] font-black border uppercase tracking-widest ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default function Index({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Presence Tracking"
        >
            <Head title="Attendance Logs" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Authentication Log</h2>
                        <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Real-time attendance intelligence dashboard.</p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href={route('admin.attendance.export')}
                            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded border border-slate-100 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Export Data
                        </a>
                        <Link
                            href={route('admin.attendance.scanner')}
                            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            Launch Scanner
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User Profile</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Class Segment</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ingress Time</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {attendances.data.map((attendance) => (
                                    <tr key={attendance.id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-11 w-11 rounded bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-100">
                                                    {attendance.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 tracking-tight leading-none mb-1">{attendance.user.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ID: {attendance.user.nisn}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded text-[10px] font-black uppercase tracking-widest border border-slate-100">
                                                Class {attendance.user.classroom || '-'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-700 tracking-tighter tabular-nums">
                                            {attendance.time_in}
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={attendance.status} />
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-tight">
                                            {new Date(attendance.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
