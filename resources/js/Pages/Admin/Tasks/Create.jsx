import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Create({ auth, classrooms }) {
    const [subjects, setSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subject: '',
        description: '',
        classroom: '',
        due_date: '',
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
        } else {
            setSubjects([]);
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
        post(route('admin.task.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Buat Tugas Baru</h2>}
        >
            <Head title="Buat Tugas PR" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Detail Tugas Baru</h3>
                                    <p className="text-sm font-medium text-gray-400">Buat tugas yang spesifik untuk kelas dan mata pelajaran tertentu.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Classroom Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Pilih Kelas</label>
                                        <select 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3.5 px-4 shadow-sm font-medium"
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
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3.5 px-4 shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        {!data.classroom && <p className="text-[10px] text-orange-400 font-bold mt-1 ml-1 italic">* Pilih kelas terlebih dahulu</p>}
                                        {errors.subject && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.subject}</p>}
                                    </div>

                                    {/* Task Title */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Judul Tugas</label>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3.5 px-4 shadow-sm font-bold text-gray-800"
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
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3.5 px-4 shadow-sm font-medium cursor-pointer"
                                            value={data.due_date}
                                            onChange={e => setData('due_date', e.target.value)}
                                            required
                                        />
                                        {errors.due_date && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.due_date}</p>}
                                    </div>

                                    {/* File Upload */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Lampiran (Jika ada)</label>
                                        <div className="relative group">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={e => setData('file', e.target.files[0])}
                                            />
                                            <div className="w-full rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 group-hover:bg-indigo-50/30 group-hover:border-indigo-200 transition-all py-6 px-4 flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-700">
                                                        {data.file ? data.file.name : 'Klik untuk pilih file materi atau soal'}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 font-medium italic">Format: PDF, Dokumen, Gambar (Max. 5MB)</p>
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
                                            className="w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3.5 px-4 shadow-sm font-medium placeholder-gray-300"
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
                                        className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 text-sm"
                                    >
                                        {processing ? 'Sedang Menyimpan...' : 'Simpan & Publikasikan'}
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
