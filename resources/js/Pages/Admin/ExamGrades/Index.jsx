import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, grades, classrooms, subjects, filters }) {
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        router.get(route('admin.exam-grade.index'), newFilters, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Manajemen Nilai UTS/UAS</h2>}
        >
            <Head title="Manajemen Nilai" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">Daftar Nilai Ujian</h3>
                            <p className="text-sm text-gray-400 font-medium">Lihat dan kelola hasil ujian UTS dan UAS siswa.</p>
                        </div>
                        <Link
                            href={route('admin.exam-grade.create')}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            Input Nilai Baru
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex flex-wrap gap-4">
                            <select
                                className="rounded-xl border-gray-200 text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500"
                                value={filters.classroom || ''}
                                onChange={e => handleFilterChange('classroom', e.target.value)}
                            >
                                <option value="">Semua Kelas</option>
                                {classrooms.map(cls => (
                                    <option key={cls} value={cls}>Kelas {cls}</option>
                                ))}
                            </select>

                            <select
                                className="rounded-xl border-gray-200 text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500"
                                value={filters.subject || ''}
                                onChange={e => handleFilterChange('subject', e.target.value)}
                            >
                                <option value="">Semua Mapel</option>
                                {subjects.map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>

                            <select
                                className="rounded-xl border-gray-200 text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500"
                                value={filters.type || ''}
                                onChange={e => handleFilterChange('type', e.target.value)}
                            >
                                <option value="">Semua Jenis</option>
                                <option value="UTS">UTS</option>
                                <option value="UAS">UAS</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Siswa</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Mapel</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Jenis</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Nilai</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">TA / Semester</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {grades.data.length > 0 ? grades.data.map((grade) => (
                                        <tr key={grade.id} className="hover:bg-indigo-50/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                        {grade.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">{grade.user.name}</div>
                                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Kelas {grade.classroom}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-gray-600">{grade.subject}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${grade.type === 'UTS' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {grade.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-lg font-black ${grade.score >= 75 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {grade.score}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-500 font-medium">{grade.academic_year}</div>
                                                <div className="text-[10px] font-bold text-gray-400">{grade.semester}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.exam-grade.destroy', grade.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                    onBefore={() => confirm('Hapus data nilai ini?')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">Belum ada data nilai.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
