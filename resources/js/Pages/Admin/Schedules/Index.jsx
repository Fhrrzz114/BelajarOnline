import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, schedules, classrooms, selectedClassroom }) {
    
    const handleClassroomChange = (e) => {
        router.get(route('admin.schedules.index'), { classroom: e.target.value });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Kelola Jadwal Pelajaran"
        >
            <Head title="Kelola Jadwal Pelajaran" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800">Jadwal Pelajaran</h2>
                        <p className="text-sm text-gray-400 font-medium">Atur jam pelajaran untuk setiap kelas.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <select 
                            value={selectedClassroom} 
                            onChange={handleClassroomChange}
                            className="bg-white border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 min-w-[150px] shadow-sm"
                        >
                            {classrooms.map(c => (
                                <option key={c} value={c}>Kelas {c}</option>
                            ))}
                        </select>
                        
                        <Link
                            href={route('admin.schedules.create')}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Tambah Jadwal
                        </Link>
                    </div>
                </div>

                <div className="space-y-8">
                    {Object.keys(schedules).length > 0 ? Object.entries(schedules).map(([day, daySchedules]) => (
                        <div key={day} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-lg font-black text-indigo-600">{day}</h3>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{daySchedules.length} Mata Pelajaran</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                            <th className="px-8 py-4">Waktu</th>
                                            <th className="px-8 py-4">Mata Pelajaran</th>
                                            <th className="px-8 py-4">Guru</th>
                                            <th className="px-8 py-4 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {daySchedules.map((s) => (
                                            <tr key={s.id} className="hover:bg-gray-50/30 transition-colors group">
                                                <td className="px-8 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        </span>
                                                        <span className="text-sm font-black text-gray-700">
                                                            {s.start_time.substring(0, 5)} - {s.end_time.substring(0, 5)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="font-bold text-gray-800">{s.subject}</div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="text-sm text-gray-500 font-medium">{s.teacher_name || '-'}</div>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <Link
                                                        href={route('admin.schedules.destroy', s.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                        onBefore={() => confirm('Hapus jadwal ini?')}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-2">Belum Ada Jadwal</h3>
                            <p className="max-w-xs mx-auto text-gray-400 font-medium">Klik tombol "Tambah Jadwal" untuk mulai menyusun kurikulum kelas ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
