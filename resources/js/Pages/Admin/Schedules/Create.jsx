import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, classrooms, days }) {
    const { data, setData, post, processing, errors } = useForm({
        classroom: classrooms[0] || '',
        day: days[0] || 'Senin',
        subject: '',
        start_time: '07:30',
        end_time: '09:00',
        teacher_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.schedules.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Tambah Jadwal Baru"
        >
            <Head title="Tambah Jadwal" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href={route('admin.schedules.index')}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Daftar Jadwal
                    </Link>
                </div>

                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Kelas</label>
                                <select
                                    value={data.classroom}
                                    onChange={e => setData('classroom', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                    required
                                >
                                    {classrooms.map(c => <option key={c} value={c}>Kelas {c}</option>)}
                                </select>
                                {errors.classroom && <div className="text-red-500 text-xs font-bold">{errors.classroom}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hari</label>
                                <select
                                    value={data.day}
                                    onChange={e => setData('day', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                    required
                                >
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                {errors.day && <div className="text-red-500 text-xs font-bold">{errors.day}</div>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                placeholder="Contoh: Matematika, Fisika, dsb."
                                required
                            />
                            {errors.subject && <div className="text-red-500 text-xs font-bold">{errors.subject}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Waktu Mulai</label>
                                <input
                                    type="time"
                                    value={data.start_time}
                                    onChange={e => setData('start_time', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                    required
                                />
                                {errors.start_time && <div className="text-red-500 text-xs font-bold">{errors.start_time}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Waktu Selesai</label>
                                <input
                                    type="time"
                                    value={data.end_time}
                                    onChange={e => setData('end_time', e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                    required
                                />
                                {errors.end_time && <div className="text-red-500 text-xs font-bold">{errors.end_time}</div>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nama Guru (Opsional)</label>
                            <input
                                type="text"
                                value={data.teacher_name}
                                onChange={e => setData('teacher_name', e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
                                placeholder="Nama Guru Pengajar"
                            />
                            {errors.teacher_name && <div className="text-red-500 text-xs font-bold">{errors.teacher_name}</div>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
