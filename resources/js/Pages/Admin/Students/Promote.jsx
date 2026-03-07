import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Promote({ auth, classrooms, students, filters }) {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        target_classroom: '',
        student_ids: [],
    });

    const handleClassroomChange = (classroom) => {
        router.get(route('admin.student.promote.page'), { classroom }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleStudent = (id) => {
        setSelectedStudents(prev => 
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map(s => s.id));
        }
    };

    useEffect(() => {
        setData('student_ids', selectedStudents);
    }, [selectedStudents]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedStudents.length === 0) {
            alert('Pilih setidaknya satu siswa untuk dinaikkan kelas.');
            return;
        }
        if (!confirm(`Yakin ingin menaikkan ${selectedStudents.length} siswa ke kelas ${data.target_classroom}?`)) {
            return;
        }
        post(route('admin.student.promote.bulk'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Kenaikan Kelas Bulk</h2>}
        >
            <Head title="Kenaikan Kelas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Promosi Siswa Massal</h3>
                                        <p className="text-sm font-medium text-gray-400">Pindahkan kelompok siswa ke kelas tingkat berikutnya.</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">1. Pilih Kelas Asal</label>
                                        <select 
                                            className="w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all py-4 px-5 shadow-sm font-bold text-gray-700"
                                            value={filters.classroom || ''}
                                            onChange={e => handleClassroomChange(e.target.value)}
                                        >
                                            <option value="">-- Pilih Kelas --</option>
                                            {classrooms.map(cls => (
                                                <option key={cls} value={cls}>Kelas {cls}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">2. Pilih Kelas Tujuan</label>
                                        <input 
                                            type="text"
                                            className="w-full rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all py-4 px-5 shadow-sm font-bold text-gray-700"
                                            placeholder="Contoh: 2-A, XII-IPA, dsb."
                                            value={data.target_classroom}
                                            onChange={e => setData('target_classroom', e.target.value)}
                                            required
                                        />
                                        {errors.target_classroom && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.target_classroom}</p>}
                                    </div>
                                </div>

                                {students.length > 0 && (
                                    <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center mb-4 px-2">
                                            <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest">3. Pilih Siswa ({selectedStudents.length}/{students.length})</h4>
                                            <button 
                                                type="button"
                                                onClick={toggleAll}
                                                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                                            >
                                                {selectedStudents.length === students.length ? 'Batalkan Semua' : 'Pilih Semua'}
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto rounded-2xl border border-gray-100">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                                                        <th className="px-6 py-4 w-10 text-center">Pilih</th>
                                                        <th className="px-6 py-4">Nama Siswa</th>
                                                        <th className="px-6 py-4">NISN</th>
                                                        <th className="px-6 py-4 text-center">Kelas Saat Ini</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {students.map(student => (
                                                        <tr 
                                                            key={student.id} 
                                                            className={`hover:bg-emerald-50/30 transition-colors cursor-pointer ${selectedStudents.includes(student.id) ? 'bg-emerald-50/50' : ''}`}
                                                            onClick={() => toggleStudent(student.id)}
                                                        >
                                                            <td className="px-6 py-4 text-center">
                                                                <input 
                                                                    type="checkbox"
                                                                    className="rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 h-4 w-4"
                                                                    checked={selectedStudents.includes(student.id)}
                                                                    onChange={() => {}} 
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-gray-700">{student.name}</td>
                                                            <td className="px-6 py-4 font-medium text-gray-500">{student.nisn}</td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-600 border border-gray-200">
                                                                    {student.classroom}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {filters.classroom && students.length === 0 && (
                                    <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                                        <p className="text-gray-400 font-bold italic">Tidak ada siswa ditemukan di kelas ini.</p>
                                    </div>
                                )}

                                <div className="pt-8 border-t border-gray-50">
                                    <button 
                                        type="submit" 
                                        disabled={processing || selectedStudents.length === 0 || !data.target_classroom}
                                        className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest"
                                    >
                                        {processing ? 'Sedang Memproses...' : `Naikkan ${selectedStudents.length} Siswa Terpilih`}
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
