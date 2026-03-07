import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, schedules }) {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    
    const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date());

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Jadwal Pelajaran</h2>}
        >
            <Head title="Jadwal Pelajaran" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 mb-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-1 text-white">Jadwal Kelas {auth.user.classroom}</h3>
                            <p className="text-indigo-100 font-medium opacity-90">Pantau jadwal harianmu agar tidak tertinggal pelajaran.</p>
                        </div>
                        <div className="relative z-10">
                            <a 
                                href={route('user.schedules.download')}
                                target="_blank"
                                className="inline-flex items-center px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold text-sm text-white hover:bg-white/30 transition-all gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" /></svg>
                                Unduh Jadwal (PDF)
                            </a>
                        </div>
                        <div className="absolute right-[-20px] top-[-20px] opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                        {days.map((day) => {
                            const daySchedules = schedules[day] || [];
                            const isToday = today === day;

                            return (
                                <div key={day} className={`flex flex-col gap-3 ${isToday ? 'lg:col-span-2' : ''}`}>
                                    <div className={`px-4 py-2.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider border shadow-sm ${isToday ? 'bg-indigo-600 text-white border-indigo-600 text-shadow-sm flex items-center justify-center gap-2' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                                        {day}
                                        {isToday && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 011.532-2.519c.343-.153.754-.247 1.25-.247 1.127 0 2.22.427 3.01 1.218a4.25 4.25 0 11-6.185 1.583c.214-.241.44-.45.672-.63a4.7 4.7 0 01-.157.632c-.334.804-.614 1.768-.84 2.734a31.39 31.39 0 00-.613 3.58 2.64 2.64 0 011.532-2.519c.343-.153.754-.247 1.25-.247 1.127 0 2.22.427 3.01 1.218a4.25 4.25 0 11-6.185 1.583" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {daySchedules.length > 0 ? daySchedules.map((s) => (
                                            <div key={s.id} className={`p-4 rounded-xl border transition-all hover:border-indigo-200 group ${isToday ? 'bg-white border-indigo-100 shadow-sm' : 'bg-white border-gray-100'}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`p-1.5 rounded-lg ${isToday ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <span className={`text-[10px] font-bold uppercase tracking-tight ${isToday ? 'text-indigo-400' : 'text-gray-400'}`}>
                                                        {s.start_time.substring(0, 5)} - {s.end_time.substring(0, 5)}
                                                    </span>
                                                </div>
                                                <h4 className={`font-bold text-sm leading-tight mb-0.5 ${isToday ? 'text-gray-800' : 'text-gray-600'}`}>{s.subject}</h4>
                                                <p className={`text-[10px] font-medium ${isToday ? 'text-indigo-500/70' : 'text-gray-400'}`}>{s.teacher_name || 'Guru Pengajar'}</p>
                                            </div>
                                        )) : (
                                            <div className="px-4 py-10 bg-gray-50/30 rounded-xl border border-dashed border-gray-200 text-center">
                                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Libur</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
