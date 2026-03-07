import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, upcoming_tasks, today_schedule, recent_grades }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Dashboard Murid</h2>}
        >
            <Head title="Dashboard Murid" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 mb-10 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block backdrop-blur-md border border-white/10">
                                Selamat Datang Kembali
                            </span>
                            <h1 className="text-4xl font-black mb-3">
                                Halo, {user.name}! 
                            </h1>
                            <p className="text-indigo-50 opacity-90 text-lg font-medium">
                                Kamu berada di <span className="underline decoration-white/30 font-bold">Kelas {user.classroom}</span>. 
                                Mari lanjutkan petualangan belajarmu hari ini!
                            </p>
                        </div>
                        <div className="absolute right-[-20px] top-[-20px] opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Kehadiran</p>
                                <h4 className="text-2xl font-black text-gray-800">{stats.attendance_count} Hari</h4>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tugas Selesai</p>
                                <h4 className="text-2xl font-black text-gray-800">{stats.submitted_tasks} / {stats.total_tasks}</h4>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between lg:col-span-2">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Peringkat & Perkembangan</p>
                                <div className="flex items-center gap-4">
                                    <h4 className="text-2xl font-black text-gray-800">Sangat Baik</h4>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-[200px] overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                                    Jadwal Belajar Hari Ini
                                </h3>
                                <div className="space-y-4">
                                    {today_schedule.length > 0 ? (
                                        today_schedule.map((item, i) => (
                                            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:border-indigo-200 transition-all group">
                                                <div className="text-center min-w-[80px]">
                                                    <p className="text-sm font-black text-indigo-600">{item.start_time}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Selesai {item.end_time}</p>
                                                </div>
                                                <div className="w-px h-10 bg-gray-100"></div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-bold text-gray-800">{item.subject}</h4>
                                                    <p className="text-sm text-gray-400 font-medium">{item.teacher_name || 'Materi Umum'}</p>
                                                </div>
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-gray-50 p-10 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                                            <p className="text-gray-400 font-bold">Tidak ada jadwal pelajaran hari ini.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                                    Nilai Tugas Terbaru
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {recent_grades.map((grade, i) => (
                                        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                                    </svg>
                                                </div>
                                                <span className="text-2xl font-black text-gray-800">{grade.score}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-700 truncate mb-1">{grade.task.title}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{grade.task.subject}</p>
                                        </div>
                                    ))}
                                    {recent_grades.length === 0 && (
                                        <div className="col-span-3 bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                                            <p className="text-gray-400 font-bold">Belum ada nilai yang keluar.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-6 bg-red-500 rounded-full"></span>
                                    Tugas Mendatang
                                </h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                                    {upcoming_tasks.length > 0 ? (
                                        upcoming_tasks.map((task, i) => (
                                            <Link key={i} href={route('user.tasks.index')} className="p-5 block hover:bg-gray-50 transition-colors group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded-md border border-red-100">
                                                        Deadline: {task.due_date}
                                                    </span>
                                                </div>
                                                <h4 className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                                                <p className="text-xs text-gray-400 font-medium mt-1">{task.subject}</p>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <p className="text-gray-400 text-sm font-bold">Semua tugas sudah selesai! 🎉</p>
                                        </div>
                                    )}
                                </div>
                                {upcoming_tasks.length > 0 && (
                                    <Link href={route('user.tasks.index')} className="mt-4 block text-center py-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                                        Lihat Semua Tugas
                                    </Link>
                                )}
                            </div>

                            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100">
                                <h4 className="font-bold mb-2">Butuh Bantuan?</h4>
                                <p className="text-xs text-indigo-100 opacity-90 leading-relaxed mb-4">
                                    Jika kamu mengalami kendala dalam mengakses materi atau sistem, hubungi admin sekolah melalui menu profil.
                                </p>
                                <Link href={route('profile.edit')} className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">
                                    Bantuan Sistem
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
