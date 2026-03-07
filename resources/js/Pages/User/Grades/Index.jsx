import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, report }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Laporan Nilai Siswa</h2>}
        >
            <Head title="Laporan Nilai" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight mb-1">Ringkasan Akademik</h3>
                                    <p className="text-indigo-100 font-medium opacity-90">Pantau perkembangan nilaimu di setiap mata pelajaran.</p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status Keaktifan</div>
                                <div className="text-xl font-black">Siswa Aktif</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {report.length > 0 ? report.map((item, index) => (
                            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 group overflow-hidden relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-gray-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">{item.subject}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kelas {auth.user.classroom}</span>
                                            <div className="h-1 w-1 rounded-full bg-gray-200"></div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.task_count} Tugas</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            item.status === 'Lulus' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : (item.status === 'Remedi' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-gray-50 text-gray-400 border-gray-100')
                                        }`}>
                                            {item.status}
                                        </div>
                                        {item.is_unmatched && (
                                            <div className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span>Mismatch</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Rata Tugas</div>
                                        <div className="text-sm font-black text-gray-700">{Math.round(item.task_avg)}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">UTS</div>
                                        <div className="text-sm font-black text-gray-700">{item.uts || '-'}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">UAS</div>
                                        <div className="text-sm font-black text-gray-700">{item.uas || '-'}</div>
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-2xl p-4 text-white flex justify-between items-center shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Rata-Rata Akhir</span>
                                    <span className="text-2xl font-black">{item.final_avg}</span>
                                </div>

                                <div className="absolute -right-12 -top-12 h-32 w-32 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-3xl -z-10"></div>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-400 italic">Belum ada laporan nilai yang tersedia.</h4>
                                <p className="text-sm text-gray-300 mt-2">Nilai akan muncul setelah tugas, UTS, atau UAS-mu dinilai oleh guru.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
