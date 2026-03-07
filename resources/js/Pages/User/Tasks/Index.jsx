import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Index({ auth, tasks }) {
    const { flash } = usePage().props;
    const [submittingTask, setSubmittingTask] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const averageScore = tasks.reduce((acc, task) => {
        const submission = task.submissions[0];
        return acc + (submission?.score || 0);
    }, 0) / (tasks.filter(t => t.submissions[0] && t.submissions[0].score !== null).length || 1);

    const openSubmitModal = (task) => {
        setSubmittingTask(task);
        setData('file', null);
    };

    const closeSubmitModal = () => {
        setSubmittingTask(null);
        reset();
    };

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const submitTask = (e) => {
        e.preventDefault();
        post(route('user.tasks.submit', submittingTask.id), {
            onSuccess: () => closeSubmitModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Daftar Tugas & Nilai</h2>}
        >
            <Head title="Nilai Tugas" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 mb-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                                Pencapaian Belajarmu
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                            </h3>
                            <p className="text-indigo-100 font-medium opacity-90">Terus tingkatkan semangat belajarmu di kelas {auth.user.classroom}!</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl border border-white/30 text-center min-w-[140px] relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Rata-rata Nilai</p>
                            <p className="text-4xl font-black">{Math.round(averageScore)}</p>
                        </div>
                        <div className="absolute right-[-20px] top-[-20px] opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.length > 0 ? tasks.map((task) => {
                            const submission = task.submissions[0];
                            const isGraded = submission && submission.score !== null;
                            const isSubmitted = !!submission;

                            return (
                                <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:border-indigo-200 transition-all hover:shadow-md group">
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${isSubmitted ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                                {isSubmitted ? 'Selesai' : 'Belum Kumpul'}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                                        <p className="text-xs text-gray-400 line-clamp-2 mb-4 font-medium leading-relaxed">{task.description || 'Kerjakan tugas sesuai instruksi guru.'}</p>
                                        
                                        {isGraded ? (
                                            <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 relative overflow-hidden">
                                                <div className="relative z-10">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nilai Akhir:</p>
                                                    <div className="flex items-end gap-1.5">
                                                        <span className={`text-3xl font-bold ${submission.score >= 75 ? 'text-emerald-600' : 'text-orange-500'}`}>{submission.score}</span>
                                                        <span className="text-[10px] text-gray-400 font-bold mb-1">/ 100</span>
                                                    </div>
                                                    {submission.feedback && (
                                                        <div className="mt-3 text-[11px] text-gray-500 italic border-l-2 border-indigo-200 pl-3 leading-relaxed">
                                                            "{submission.feedback}"
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`absolute right-[-5px] bottom-[-10px] text-6xl font-black ${submission.score >= 75 ? 'text-emerald-500/5' : 'text-orange-500/5'}`}>
                                                    {submission.score}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-4">
                                                {isSubmitted ? (
                                                    <div className="p-4 bg-gray-50/30 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center py-5">
                                                        <div className="p-2 bg-white rounded-full shadow-sm mb-2 text-indigo-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menunggu Dinilai</p>
                                                        <button 
                                                            onClick={() => openSubmitModal(task)}
                                                            className="text-[10px] text-indigo-600 font-bold hover:underline"
                                                        >
                                                            Update File
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => openSubmitModal(task)}
                                                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4-4v12" /></svg>
                                                        Kirim Tugas
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-6 py-3 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-gray-400">{isSubmitted ? 'Dikirim: ' + new Date(submission.created_at).toLocaleDateString('id-ID') : 'Belum dikirim'}</span>
                                        {isSubmitted && submission.file_path && (
                                            <a href={`/storage/${submission.file_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                File
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-full bg-white p-12 rounded-xl border border-dashed border-gray-200 text-center shadow-sm">
                                <p className="text-gray-400 font-medium italic">Belum ada tugas untuk kelasmu.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {submittingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-800">Kirim Tugas</h3>
                            <p className="text-xs font-medium text-gray-400 line-clamp-1">{submittingTask.title}</p>
                        </div>
                        <form onSubmit={submitTask} className="p-6 space-y-5">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pilih File (PDF/DOC/IMG)</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="task-file"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    <label
                                        htmlFor="task-file"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer"
                                    >
                                        {data.file ? (
                                            <div className="text-center p-4">
                                                <p className="text-xs font-bold text-gray-800 truncate max-w-[250px]">{data.file.name}</p>
                                                <p className="text-[10px] text-indigo-500 font-bold mt-1">Ganti file</p>
                                            </div>
                                        ) : (
                                            <div className="text-center p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                <p className="text-[10px] font-bold text-gray-400">Pilih file (Maks 5MB)</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <div className="text-red-500 text-[10px] font-bold">{errors.file}</div>}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeSubmitModal}
                                    className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl text-xs hover:bg-gray-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !data.file}
                                    className="flex-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
