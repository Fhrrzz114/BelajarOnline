import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';

export default function Show({ auth, task }) {
    const { flash } = usePage().props;
    const [gradingSubmission, setGradingSubmission] = useState(null);
    const [aiLoading, setAiLoading] = useState(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        score: '',
        feedback: '',
    });

    const openGradeModal = (submission) => {
        setGradingSubmission(submission);
        setData({
            score: submission.score || '',
            feedback: submission.feedback || '',
        });
    };

    const closeGradeModal = () => {
        setGradingSubmission(null);
        reset();
    };

    const submitGrade = (e) => {
        e.preventDefault();
        patch(route('admin.submissions.grade', gradingSubmission.id), {
            onSuccess: () => closeGradeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`Detail Tugas: ${task.title}`}
        >
            <Head title={`Submissions - ${task.title}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-6 p-4 bg-cyan-50 border-l-4 border-cyan-500 rounded-lg flex items-center shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <svg className="h-5 w-5 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-semibold text-cyan-800">{flash.success}</p>
                    </div>
                )}

                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href={route('admin.task.index')}
                        className="group flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors duration-200"
                    >
                        <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:border-violet-200 group-hover:bg-violet-50 shadow-sm transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        <span className="font-bold text-sm">Kembali ke Daftar</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Pengumpulan</p>
                            <p className="text-sm font-black text-slate-900">{task.submissions.length} Selesai</p>
                        </div>
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <div 
                                className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((task.submissions.length / 30) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* Information Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-125 opacity-40"></div>
                            
                            <div className="relative">
                                <header className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    </div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Informasi Tugas</h3>
                                </header>
                                
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-1.5 leading-none">Judul Instruksi</label>
                                        <p className="text-slate-900 font-extrabold text-lg leading-tight uppercase">{task.title}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-lg bg-cyan-50/30 border border-cyan-100">
                                            <label className="text-[10px] font-black text-cyan-600/60 uppercase block mb-1.5 leading-none">Kelas</label>
                                            <p className="text-cyan-700 font-black flex items-center gap-2">
                                                {task.classroom}
                                            </p>
                                        </div>
                                        <div className="p-5 rounded-lg bg-rose-50/50 border border-rose-100">
                                            <label className="text-[10px] font-black text-rose-400 uppercase block mb-1.5 leading-none">Deadline</label>
                                            <p className="text-rose-600 font-black truncate">
                                                {new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </p>
                                        </div>
                                    </div>

                                    {task.file_path && (
                                        <a 
                                            href={`/storage/${task.file_path}`} 
                                            target="_blank" 
                                            className="flex items-center justify-between w-full p-4 bg-slate-900 text-white rounded-lg hover:bg-violet-600 active:scale-[0.98] transition-all duration-300 group/btn shadow-xl shadow-slate-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/10 rounded group-hover/btn:bg-white/20 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" /></svg>
                                                </div>
                                                <span className="font-black text-[10px] uppercase tracking-widest">Materi Guru</span>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-cyan-500 p-7 rounded-xl shadow-xl shadow-cyan-100 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            </div>
                            <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1.5 leading-none">Penilaian AI & Manual</p>
                            <h4 className="text-3xl font-black tabular-nums">{task.submissions.filter(s => s.score !== null).length} / {task.submissions.length}</h4>
                            <div className="mt-6 flex items-center gap-2">
                                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-white rounded-full transition-all duration-700"
                                        style={{ width: `${(task.submissions.filter(s => s.score !== null).length / (task.submissions.length || 1)) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-black opacity-80">DONE</span>
                            </div>
                        </div>
                    </div>

                    {/* Submissions Table Area */}
                    <div className="lg:col-span-8 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-slate-50/30">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 mb-1 leading-none uppercase tracking-tight">Daftar Pengumpulan</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                                    Monitoring Real-time
                                </p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <a 
                                    href={route('admin.task.export', task.id)}
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 rounded-lg font-black text-[10px] uppercase tracking-widest text-slate-900 hover:border-violet-600 hover:text-violet-600 transition-all gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Ekspor Recap
                                </a>
                                <div className="px-5 py-3 bg-violet-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-100">
                                    {task.submissions.length} Murid
                                </div>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Siswa</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail File</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Skor Akhir</th>
                                        <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {task.submissions.length > 0 ? task.submissions.map((submission) => (
                                        <tr key={submission.id} className="hover:bg-slate-50/30 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded bg-slate-900 flex items-center justify-center text-white font-black text-xs group-hover:bg-violet-600 transition-colors">
                                                        {submission.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-900 leading-tight uppercase tracking-tight">{submission.user.name}</div>
                                                        <div className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded mt-1.5 inline-block">SUB #{submission.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-2">
                                                    <a href={`/storage/${submission.file_path}`} target="_blank" className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 font-black text-[10px] uppercase tracking-widest group/link outline-none">
                                                        <div className="p-2 bg-slate-100 rounded group-hover/link:bg-violet-100 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                        </div>
                                                        View Submission
                                                    </a>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest ml-1">{new Date(submission.created_at).toLocaleDateString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {submission.score !== null ? (
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-3xl font-black tabular-nums ${submission.score >= 75 ? 'text-cyan-500' : 'text-rose-500'}`}>
                                                            {submission.score}
                                                        </span>
                                                        <div className="max-w-[120px] hidden sm:block">
                                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">Catatan</p>
                                                            <p className="text-[10px] text-slate-500 line-clamp-1 italic font-medium leading-none">"{submission.feedback || '...'}"</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded inline-flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-ping"></span>
                                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">PENDING</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Review with AI Gemini?')) {
                                                                const currentId = submission.id;
                                                                setAiLoading(currentId);
                                                                router.post(route('admin.submissions.ai-grade', submission.id), {}, {
                                                                    onFinish: () => setAiLoading(null),
                                                                });
                                                            }
                                                        }}
                                                        disabled={aiLoading !== null}
                                                        className="h-10 w-10 bg-violet-50 text-violet-600 rounded flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300 group/ai border border-violet-100 outline-none"
                                                    >
                                                        {aiLoading === submission.id ? (
                                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/ai:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => openGradeModal(submission)}
                                                        className={`h-10 px-5 rounded font-black text-[10px] uppercase tracking-widest transition-all duration-300 outline-none border-b-4 ${submission.score !== null ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200' : 'bg-slate-900 text-white border-slate-700 hover:bg-violet-600 hover:border-violet-800'}`}
                                                    >
                                                        {submission.score !== null ? 'Modify' : 'Grade'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-24 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded mx-auto flex items-center justify-center mb-6 border border-slate-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                </div>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Submissions Yet</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Beri Nilai */}
            {gradingSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-500" onClick={closeGradeModal}></div>
                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-md overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-5 mb-3">
                                <div className="w-14 h-14 rounded bg-violet-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-violet-100">
                                    {gradingSubmission.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-2 tracking-tight">Pemberian Nilai</h3>
                                    <p className="text-[10px] text-violet-600 font-black uppercase tracking-widest leading-none">{gradingSubmission.user.name}</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={submitGrade} className="p-10 space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 leading-none underline decoration-cyan-400 underline-offset-4">Input Skor (0-100)</label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.score}
                                        onChange={e => setData('score', e.target.value)}
                                        className="w-full px-0 py-6 bg-transparent border-b-4 border-slate-100 focus:border-violet-600 focus:ring-0 font-black text-6xl text-slate-900 transition-all placeholder:text-slate-100"
                                        placeholder="00"
                                        required
                                        autoFocus
                                    />
                                    <div className="absolute right-0 bottom-6 text-slate-300 font-black text-xl group-focus-within:text-violet-600 transition-colors">PTS</div>
                                </div>
                                {errors.score && <div className="text-rose-500 text-[9px] font-black mt-3 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded inline-block">{errors.score}</div>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 leading-none underline decoration-violet-400 underline-offset-4">Catatan Feedback</label>
                                <textarea
                                    value={data.feedback}
                                    onChange={e => setData('feedback', e.target.value)}
                                    className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded focus:border-violet-600 focus:ring-0 min-h-[140px] text-[13px] font-semibold text-slate-700 placeholder:text-slate-200 resize-none transition-all"
                                    placeholder="Apa yang perlu diperbaiki oleh siswa ini?"
                                ></textarea>
                                {errors.feedback && <div className="text-rose-500 text-[9px] font-black mt-3 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded inline-block">{errors.feedback}</div>}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={closeGradeModal}
                                    className="flex-1 py-5 bg-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded hover:bg-violet-600 shadow-xl shadow-slate-100 active:scale-95 transition-all disabled:opacity-50 border-b-4 border-slate-950 active:border-b-0"
                                >
                                    {processing ? 'Saving...' : 'Finalize Grade'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
