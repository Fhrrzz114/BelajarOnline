import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Create({ auth, classrooms, students, subjects, filters }) {
    const { data, setData, post, processing, errors } = useForm({
        classroom: filters.classroom || '',
        subject: filters.subject || '',
        type: filters.type || 'UTS',
        academic_year: filters.academic_year || `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
        semester: filters.semester || 'Ganjil',
        grades: []
    });

    useEffect(() => {
        if (students && students.length > 0) {
            setData('grades', students.map(s => ({
                user_id: s.id,
                name: s.name,
                score: ''
            })));
        }
    }, [students]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        router.get(route('admin.exam-grade.create'), newFilters, { 
            preserveState: true,
            onSuccess: (page) => {
                setData(prev => ({
                    ...prev,
                    [key]: value
                }));
            }
        });
    };

    const handleScoreChange = (index, score) => {
        const newGrades = [...data.grades];
        newGrades[index].score = score;
        setData('grades', newGrades);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.exam-grade.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Input Nilai UTS/UAS</h2>}
        >
            <Head title="Input Nilai" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">Form Input Nilai</h3>
                                    <p className="text-sm text-gray-400 font-medium">Pilih filter dan masukkan nilai ujian siswa.</p>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Pilih Kelas</label>
                                        <select 
                                            className="w-full rounded-xl border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 py-3 shadow-sm font-bold text-gray-700"
                                            value={data.classroom}
                                            onChange={e => handleFilterChange('classroom', e.target.value)}
                                            required
                                        >
                                            <option value="">-- Pilih Kelas --</option>
                                            {classrooms.map(cls => (
                                                <option key={cls} value={cls}>Kelas {cls}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                                        <select 
                                            className="w-full rounded-xl border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 py-3 shadow-sm font-bold text-gray-700 disabled:opacity-50"
                                            value={data.subject}
                                            onChange={e => setData('subject', e.target.value)}
                                            disabled={!data.classroom}
                                            required
                                        >
                                            <option value="">-- Pilih Mapel --</option>
                                            {subjects.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Jenis Ujian</label>
                                        <div className="flex gap-4 pt-1">
                                            {['UTS', 'UAS'].map(type => (
                                                <label key={type} className="flex-1 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        className="hidden peer" 
                                                        name="type" 
                                                        value={type}
                                                        checked={data.type === type}
                                                        onChange={e => setData('type', e.target.value)}
                                                    />
                                                    <div className="text-center py-2.5 rounded-xl border-2 border-transparent bg-white peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-checked:bg-indigo-50 font-black tracking-widest text-xs transition-all shadow-sm">
                                                        {type}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Thn Ajaran</label>
                                            <input 
                                                type="text" 
                                                className="w-full rounded-xl border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 py-3 shadow-sm font-bold text-gray-700 uppercase"
                                                placeholder="2023/2024"
                                                value={data.academic_year}
                                                onChange={e => setData('academic_year', e.target.value.toUpperCase())}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Semester</label>
                                            <select 
                                                className="w-full rounded-xl border-gray-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 py-3 shadow-sm font-bold text-gray-700"
                                                value={data.semester}
                                                onChange={e => setData('semester', e.target.value)}
                                                required
                                            >
                                                <option value="Ganjil">Ganjil</option>
                                                <option value="Genap">Genap</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {data.classroom && students && students.length > 0 && (
                                <div className="p-0 border-t border-gray-50">
                                    <div className="p-4 bg-indigo-50/30 border-b border-gray-50 sticky top-0 z-10 backdrop-blur-sm">
                                        <div className="flex justify-between items-center bg-white px-5 py-3 rounded-xl border border-indigo-100 shadow-sm">
                                            <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Input Skor Siswa</span>
                                            <span className="text-[10px] px-2.5 py-1 bg-indigo-600 text-white rounded-lg font-black uppercase tracking-widest">{students.length} Orang</span>
                                        </div>
                                    </div>
                                    <div className="max-h-[500px] overflow-y-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50 text-[10px] font-black tracking-widest text-gray-400 uppercase border-b border-gray-50">
                                                    <th className="px-8 py-3 w-2/3">Identitas Siswa</th>
                                                    <th className="px-8 py-3 w-1/3 text-center">Skor Akhir</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {data.grades.map((grade, index) => (
                                                    <tr key={grade.user_id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                                                                    {grade.name.charAt(0)}
                                                                </div>
                                                                <span className="font-bold text-gray-700 text-sm">{grade.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <input 
                                                                type="number" 
                                                                min="0" 
                                                                max="100"
                                                                className="w-24 mx-auto block text-center rounded-xl border-gray-200 focus:ring-2 focus:ring-indigo-500 font-black text-indigo-600 text-lg shadow-inner bg-gray-50 focus:bg-white transition-all"
                                                                placeholder="--"
                                                                value={grade.score}
                                                                onChange={e => handleScoreChange(index, e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {!data.classroom && (
                                <div className="p-20 text-center space-y-4">
                                    <div className="h-20 w-20 rounded-[2rem] bg-indigo-50 text-indigo-200 flex items-center justify-center mx-auto shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-bold italic text-sm tracking-tight px-10">Silakan pilih kelas terlebih dahulu untuk memunculkan daftar siswa.</p>
                                    </div>
                                </div>
                            )}

                            {data.classroom && students && students.length === 0 && (
                                <div className="p-20 text-center space-y-4">
                                    <div className="h-16 w-16 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div className="text-gray-400 font-medium italic">Tidak ada siswa yang terdaftar di kelas ini.</div>
                                </div>
                            )}

                            <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <Link
                                    href={route('admin.exam-grade.index')}
                                    className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-center shadow-sm text-sm"
                                >
                                    Batalkan
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing || !data.classroom || !students || students.length === 0}
                                    className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 text-sm"
                                >
                                    {processing ? 'Sedang Menyimpan...' : 'Simpan Semua Nilai'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
