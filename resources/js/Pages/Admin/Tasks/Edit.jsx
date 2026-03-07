import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Edit({ auth, task, classrooms }) {
    const [subjects, setSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        title: task.title,
        subject: task.subject || '',
        description: task.description || '',
        classroom: task.classroom,
        due_date: task.due_date,
        file: null,
    });

    useEffect(() => {
        if (data.classroom) {
            setLoadingSubjects(true);
            axios.get(route('admin.task.subjects', { classroom: data.classroom }))
                .then(response => {
                    setSubjects(response.data);
                    setLoadingSubjects(false);
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                    setLoadingSubjects(false);
                });
        }
    }, [data.classroom]);

    const handleSubjectChange = (e) => {
        const val = e.target.value;
        setData(prev => ({
            ...prev,
            subject: val,
            title: val ? `Tugas ${val}` : prev.title
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.task.update', task.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Edit Detail Tugas</h2>}
        >
            <Head title="Edit Tugas PR" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Perbarui Tugas</h3>
                                    <p className="text-sm font-medium text-gray-400">Modifikasi informasi tugas yang sudah ada untuk kelas {task.classroom}.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Classroom Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Pilih Kelas</label>
                                        <select 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all py-3.5 px-4 shadow-sm font-medium"
                                            value={data.classroom}
                                            onChange={e => setData('classroom', e.target.value)}
                                            required
                                        >
                                            <option value="">-- Pilih Kelas --</option>
                                            {classrooms.map(cls => (
                                                <option key={cls} value={cls}>Kelas {cls}</option>
                                            ))}
                                        </select>
                                        {errors.classroom && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.classroom}</p>}
                                    </div>

                                    {/* Subject Selection (Dynamic) */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                                        <select 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all py-3.5 px-4 shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            value={data.subject}
                                            onChange={handleSubjectChange}
                                            disabled={!data.classroom || loadingSubjects}
                                            required
                                        >
                                            <option value="">{loadingSubjects ? 'Memuat...' : '-- Pilih Mapel --'}</option>
                                            {subjects.map((sub, i) => (
                                                <option key={i} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                        {errors.subject && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.subject}</p>}
                                    </div>

                                    {/* Task Title */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Judul Tugas</label>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all py-3.5 px-4 shadow-sm font-bold text-gray-800"
                                            placeholder="Contoh: PR Matematika - Aljabar"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.title}</p>}
                                    </div>

                                    {/* Due Date */}
                                    <div className="md:col-span-1 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Batas Waktu</label>
                                        <input 
                                            type="date" 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all py-3.5 px-4 shadow-sm font-medium cursor-pointer"
                                            value={data.due_date}
                                            onChange={e => setData('due_date', e.target.value)}
                                            required
                                        />
                                        {errors.due_date && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.due_date}</p>}
                                    </div>

                                    {/* File Upload */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Lampiran File</label>
                                        
                                        {task.file_path && !data.file && (
                                            <div className="mb-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-indigo-700">File Tersimpan:</p>
                                                        <p className="text-[11px] text-indigo-500 font-medium truncate max-w-[200px]">{task.file_path.split('/').pop()}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter bg-white px-2 py-1 rounded-md shadow-sm">Sudah Ada</span>
                                            </div>
                                        )}

                                        <div className="relative group">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={e => setData('file', e.target.files[0])}
                                            />
                                            <div className="w-full rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 group-hover:bg-amber-50/30 group-hover:border-amber-200 transition-all py-6 px-4 flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-700">
                                                        {data.file ? data.file.name : 'Pilih file baru untuk mengganti lampiran'}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 font-medium italic">Biarkan kosong jika tidak ingin mengubah file.</p>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.file && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.file}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Deskripsi & Instruksi</label>
                                        <textarea 
                                            rows="5"
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all py-3.5 px-4 shadow-sm font-medium placeholder-gray-300"
                                            placeholder="Tuliskan instruksi langkah-langkah pengerjaan tugas secara detail..."
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                        ></textarea>
                                        {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.description}</p>}
                                    </div>
                                </div>

                                <div className="pt-8 flex gap-4 border-t border-gray-50">
                                    <Link
                                        href={route('admin.task.index')}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all text-center text-sm shadow-inner"
                                    >
                                        Batalkan
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="flex-[2] py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-100 disabled:opacity-50 text-sm"
                                    >
                                        {processing ? 'Sedang Memperbarui...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
