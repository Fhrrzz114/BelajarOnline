import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard Siswa"
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Hero */}
                <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 md:p-12 mb-8 shadow-xl shadow-indigo-100">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Selamat Datang, {auth.user.name}! 👋
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Senang melihatmu kembali. Jelajahi materi pelajaran, cek tugas terbaru, atau lihat pengumuman sekolah di sini.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                                Lihat Materi
                            </button>
                            <button className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl border border-indigo-400 hover:bg-indigo-400 transition-colors">
                                Jadwal Pelajaran
                            </button>
                        </div>
                    </div>
                    {/* Abstract patterns */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 mb-4 mr-4 hidden lg:block opacity-20">
                         <svg width="200" height="200" viewBox="0 0 24 24" fill="white">
                            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                        </svg>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Tugas Berjalan</h4>
                        <p className="text-sm text-gray-500 mb-4">Ada 3 tugas yang perlu kamu selesaikan minggu ini.</p>
                        <a href="#" className="text-amber-600 text-sm font-bold hover:underline">Selesaikan Sekarang &rarr;</a>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Presensi Hari Ini</h4>
                        <p className="text-sm text-gray-500 mb-4">Kamu sudah terabsen masuk pada pukul 07:15 WIB.</p>
                        <a href="#" className="text-green-600 text-sm font-bold hover:underline">Riwayat Presensi &rarr;</a>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Pengumuman</h4>
                        <p className="text-sm text-gray-500 mb-4">Pekan olahraga sekolah akan dimulai senin depan.</p>
                        <a href="#" className="text-blue-600 text-sm font-bold hover:underline">Baca Selengkapnya &rarr;</a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
