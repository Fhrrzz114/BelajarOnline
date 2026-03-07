import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, recent_submissions, recent_attendance }) {
    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header="Dashboard Utama"
        >
            <Head title="Admin Dashboard" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 mb-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Selamat datang, Guru {auth.user.name}!</h2>
                        <p className="text-indigo-100 opacity-90 max-w-xl">
                            Pantau perkembangan seluruh siswa, kelola pengajar, dan lihat aktivitas terbaru sistem SmartStudy dalam satu tampilan terpadu.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Siswa', value: stats.total_students, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-blue-600' },
                        { label: 'Total Guru', value: stats.total_teachers, icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zM9 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-indigo-600' },
                        { label: 'Kelas Aktif', value: stats.active_classes, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'bg-violet-600' },
                        { label: 'Absensi Hari Ini', value: stats.today_attendance, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-emerald-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                                    <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                                Pengumpulan Tugas Terbaru
                            </h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {recent_submissions.length > 0 ? (
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Siswa</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Tugas</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {recent_submissions.map((sub) => (
                                                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                                                                {sub.user.name.charAt(0)}
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-700">{sub.user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600 truncate block max-w-[200px]">{sub.task.title}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {sub.score ? (
                                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">Dinilai: {sub.score}</span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-lg border border-amber-100">Menunggu</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Link href={route('admin.task.show', sub.task_id)} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">Detail</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-12 text-center">
                                        <p className="text-gray-400 font-medium">Belum ada pengumpulan tugas.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
                                Log Absensi Terbaru
                            </h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {recent_attendance.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {recent_attendance.map((att) => (
                                            <div key={att.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-700">{att.user.name}</p>
                                                        <p className="text-xs text-gray-400 font-medium">{att.user.nisn} • {att.user.classroom}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-700">{att.time_in}</p>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${att.status === 'present' ? 'text-emerald-500' : 'text-amber-500'}`}>{att.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <p className="text-gray-400 font-medium">Belum ada aktivitas absensi.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-red-600 rounded-full"></span>
                            Aksi Cepat
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: 'Scanner Absensi', href: route('admin.attendance.scanner'), icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z', color: 'bg-red-50 text-red-600', hover: 'hover:bg-red-600 hover:text-white' },
                                { label: 'Input Nilai Ujian', href: route('admin.exam-grade.create'), icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-indigo-50 text-indigo-600', hover: 'hover:bg-indigo-600 hover:text-white' },
                                { label: 'Data Master Siswa', href: route('admin.student.index'), icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-blue-50 text-blue-600', hover: 'hover:bg-blue-600 hover:text-white' },
                                { label: 'Kenaikan Kelas', href: route('admin.student.promote.page'), icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'bg-violet-50 text-violet-600', hover: 'hover:bg-violet-600 hover:text-white' }
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group"
                                >
                                    <div className={`${action.color} p-3 rounded-lg group-hover:transition-colors ${action.hover}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{action.label}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
