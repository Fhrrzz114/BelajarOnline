import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, schedules, classrooms, selectedClassroom, bankMapel = [] }) {
    
    const handleClassroomChange = (e) => {
        router.get(route('admin.schedules.index'), { classroom: e.target.value });
    };

    const handleAutoGenerate = () => {
        if (bankMapel.length === 0) {
            alert('Bank Mapel masih kosong! Silakan tambahkan Mapel & Guru terlebih dahulu melalui tombol "Tambah ke Bank".');
            return;
        }

        if (confirm('Sistem akan menghapus jadwal lama di Kelas 1-6 dan menyusun ulang secara acak menggunakan data dari Bank Mapel (Senin-Jumat, 3 Mapel/hari). Lanjutkan?')) {
            router.post(route('admin.schedules.generate'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<span className="font-black text-slate-800 tracking-tight uppercase text-sm">Temporal Operations</span>}
        >
            <Head title="Academic Schedules" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* Header Section */}
                <div className="bg-slate-900 rounded-xl p-12 mb-12 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="space-y-4 text-center lg:text-left">
                            <h2 className="text-5xl font-black tracking-tighter leading-none uppercase">
                                Academic <span className="text-cyan-400">Matrix</span>
                            </h2>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] max-w-md italic opacity-80 leading-loose">
                                Orchestrate curriculum delivery via <span className="text-white underline decoration-violet-500 underline-offset-8">Central Intelligence Bank</span>. Define once, deploy everywhere.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full lg:w-auto">
                            <div className="relative min-w-[220px]">
                                <select 
                                    value={selectedClassroom} 
                                    onChange={handleClassroomChange}
                                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded text-[10px] font-black uppercase tracking-[0.2em] text-white focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 px-6 py-5 transition-all cursor-pointer appearance-none"
                                >
                                    {classrooms.map(c => (
                                        <option key={c} value={c} className="text-slate-900">SEGMENT {c}</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            <button
                                onClick={handleAutoGenerate}
                                className="group inline-flex items-center px-10 py-5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-cyan-400 transition-all duration-300 shadow-2xl active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Generate Matrix
                            </button>

                            <a
                                href={route('admin.schedules.download', selectedClassroom)}
                                target="_blank"
                                className="inline-flex items-center px-10 py-5 bg-violet-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-700 active:scale-95 transition-all duration-300 shadow-2xl shadow-violet-900/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export PDF
                            </a>
                            
                            <Link
                                href={route('admin.schedules.create')}
                                className="inline-flex items-center px-10 py-5 bg-slate-800 text-slate-300 border border-slate-700 font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-slate-700 hover:text-white transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Enlist Mapel
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bank Mapel Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-12 h-12 bg-slate-900 rounded text-white flex items-center justify-center shadow-xl shadow-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Central Course Vault</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Authorized modules available for systematic allocation.</p>
                        </div>
                        <div className="h-px flex-1 bg-slate-50"></div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{bankMapel.length} MODULES DETECTED</span>
                    </div>

                    {bankMapel.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {bankMapel.map((m) => (
                                <div key={m.id} className="bg-white border border-slate-50 rounded p-6 flex items-center justify-between gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-violet-100 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 h-1 w-0 bg-violet-500 group-hover:w-full transition-all duration-500"></div>
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded flex items-center justify-center text-slate-300 transition-all duration-300 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5 truncate group-hover:text-violet-600 transition-colors uppercase">{m.title}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate italic">PROF: {m.user?.name}</div>
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={route('admin.schedules.destroyCourse', m.id)}
                                        method="delete"
                                        as="button"
                                        className="h-8 w-8 flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded transition-all shrink-0"
                                        onBefore={() => confirm('Purge module from central vault?')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded border border-dashed border-slate-200 p-20 text-center">
                            <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] italic">Course vault empty. Initiate module enlistment above.</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
                    {Object.keys(schedules).length > 0 ? Object.entries(schedules).map(([day, daySchedules]) => (
                        <div key={day} className="lg:col-span-6 xl:col-span-4 h-full">
                            <div className="bg-white rounded shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 p-4 h-full flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                                <div className="px-6 py-5 flex justify-between items-center bg-slate-900 rounded mb-6 text-white">
                                    <h3 className="text-xl font-black tracking-tighter uppercase leading-none">{day}</h3>
                                    <div className="px-3 py-1 bg-white/10 text-cyan-400 rounded text-[10px] font-black tracking-[0.2em] border border-white/10">
                                        {daySchedules.length} CYCLES
                                    </div>
                                </div>
                                
                                <div className="space-y-4 px-2 flex-1">
                                    {daySchedules.map((s) => {
                                        const isBreak = s.subject.toLowerCase() === 'istirahat';
                                        return (
                                            <div 
                                                key={s.id} 
                                                className={`relative overflow-hidden p-6 rounded border transition-all duration-300 group-session ${
                                                    isBreak 
                                                    ? 'bg-slate-50/50 border-slate-100' 
                                                    : 'bg-white border-slate-50 hover:border-violet-100 hover:bg-slate-50/30 group'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-6">
                                                    <div className="flex items-center gap-5 flex-1 min-w-0">
                                                        <div className={`w-14 h-14 flex items-center justify-center rounded shrink-0 shadow-sm transition-colors duration-300 ${
                                                            isBreak ? 'bg-white text-slate-200' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'
                                                        }`}>
                                                            {isBreak ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${isBreak ? 'text-slate-300' : 'text-violet-500'}`}>
                                                                 {s.start_time.substring(0, 5)} — {s.end_time.substring(0, 5)}
                                                            </div>
                                                            <div className={`text-lg font-black truncate leading-none uppercase tracking-tighter ${isBreak ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                                                                {s.subject}
                                                            </div>
                                                            {!isBreak && (
                                                                <div className="text-[10px] font-bold text-slate-400 truncate mt-2 uppercase tracking-widest opacity-60 italic">
                                                                    ATTACHED: {s.teacher_name || 'UNASSIGNED'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('admin.schedules.destroy', s.id)}
                                                            method="delete"
                                                            as="button"
                                                            className="h-10 w-10 flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded transition-all active:scale-90"
                                                            onBefore={() => confirm('Permanently erase operation cycle?')}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="lg:col-span-12">
                            <div className="bg-white rounded border border-dashed border-slate-200 py-32 text-center shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                                <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Temporal Anomaly Detected</h3>
                                <p className="max-w-sm mx-auto text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] leading-loose italic">
                                    No operation cycles detected for this segment. Initiate <span className="text-violet-500 underline underline-offset-8">Auto-Generation Protocol</span> for immediate deployment.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
