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
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg flex items-center shadow-sm">
                        <svg className="h-5 w-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium text-green-800">{flash.success}</p>
                    </div>
                )}

                <div className="mb-6">
                    <Link
                        href={route('admin.task.index')}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Daftar Tugas
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Tugas</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Judul</label>
                                <p className="text-gray-800 font-medium">{task.title}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Kelas</label>
                                <p className="text-gray-800 font-medium">Kelas {task.classroom}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Deadline</label>
                                <p className="text-red-500 font-bold">{new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            {task.file_path && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">Lampiran Guru</label>
                                    <a href={`/storage/${task.file_path}`} target="_blank" className="mt-1 flex items-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 text-sm font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" /></svg>
                                        Download File
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                            <h3 className="text-lg font-bold text-gray-800">Daftar Pengumpulan Murid</h3>
                            <div className="flex items-center gap-3">
                                <a 
                                    href={route('admin.task.export', task.id)}
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs text-emerald-600 hover:bg-emerald-50 transition-all gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Ekspor Nilai (Excel)
                                </a>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">{task.submissions.length} Selesai</span>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Murid</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">File</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Nilai</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {task.submissions.length > 0 ? task.submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">{submission.user.name}</div>
                                            <div className="text-xs text-gray-400">{new Date(submission.created_at).toLocaleString('id-ID')}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/storage/${submission.file_path}`} target="_blank" className="text-indigo-600 hover:underline font-bold text-xs flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                Lihat File
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {submission.score !== null ? (
                                                <div className="flex flex-col">
                                                    <span className={`text-lg font-black ${submission.score >= 75 ? 'text-green-600' : 'text-orange-500'}`}>{submission.score}</span>
                                                    {submission.feedback && <span className="text-[10px] text-gray-400 line-clamp-1 italic">"{submission.feedback}"</span>}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic font-medium">Belum Dinilai</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    if (confirm('Gunakan AI Gemini untuk menilai tugas ini?')) {
                                                        const currentId = submission.id;
                                                        setAiLoading(currentId);
                                                        router.post(route('admin.submissions.ai-grade', submission.id), {}, {
                                                            onFinish: () => setAiLoading(null),
                                                        });
                                                    }
                                                }}
                                                disabled={aiLoading !== null}
                                                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border border-violet-200 text-violet-600 hover:bg-violet-600 hover:text-white disabled:opacity-50 inline-flex items-center gap-1`}
                                            >
                                                {aiLoading === submission.id ? (
                                                    <svg className="animate-spin h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                )}
                                                AI Grade
                                            </button>
                                            <button
                                                onClick={() => openGradeModal(submission)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${submission.score !== null ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'}`}
                                            >
                                                {submission.score !== null ? 'Ubah' : 'Manual'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">Belum ada murid yang mengumpulkan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Beri Nilai */}
            {gradingSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-black text-gray-800">Beri Nilai Tugas</h3>
                            <p className="text-sm text-gray-500">Murid: <span className="font-bold text-indigo-600">{gradingSubmission.user.name}</span></p>
                        </div>
                        <form onSubmit={submitGrade} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Skor (0-100)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.score}
                                    onChange={e => setData('score', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
                                    placeholder="85"
                                    required
                                />
                                {errors.score && <div className="text-red-500 text-xs mt-1">{errors.score}</div>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Feedback / Catatan</label>
                                <textarea
                                    value={data.feedback}
                                    onChange={e => setData('feedback', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                                    placeholder="Bagus! Tingkatkan lagi pemahamanmu di bagian..."
                                ></textarea>
                                {errors.feedback && <div className="text-red-500 text-xs mt-1">{errors.feedback}</div>}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeGradeModal}
                                    className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                                >
                                    Simpan Nilai
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
