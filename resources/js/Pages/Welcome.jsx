import { Link, Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
            <Head title="Selamat Datang di SmartStudy" />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white text-xl font-black">S</span>
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-800">SmartStudy</span>
                    </div>

                    <div className="flex items-center gap-8">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                            >
                                Ke Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                                >
                                    Daftar Sekarang
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-48 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl opacity-40">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
                        ✨ Masa Depan Pendidikan Digital
                    </div>
                    
                    <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.05]">
                        Belajar Lebih Pintar <br />
                        <span className="text-gradient">Kelola Lebih Mudah.</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-12">
                        Platform E-Learning terintegrasi untuk siswa dan guru. <br className="hidden md:block" />
                        Nikmati pengalaman belajar yang modern, interaktif, dan terstruktur.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={route('register')}
                            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-200 uppercase tracking-widest text-sm"
                        >
                            Mulai Belajar Gratis
                        </Link>
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 font-black rounded-2xl hover:bg-slate-50 border border-slate-100 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-100 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                        >
                            Pelajari Fitur
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            {/* Features Stats */}
            <section id="features" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 group">
                            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">Materi Terstruktur</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Akses semua materi pelajaran, tugas, dan jadwal dalam satu dashboard yang rapi dan terorganisir.</p>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-50 hover:bg-white hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-50 transition-all duration-500 group">
                            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">Analisis Nilai</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Pantau perkembangan akademikmu melalui laporan nilai yang detail dan perhitungan rata-rata otomatis.</p>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-50 hover:bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-50 transition-all duration-500 group">
                            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">Presensi Online</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Kelola daftar hadir dengan sistem QR code yang cepat dan akurat untuk guru dan siswa.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative p-12 md:p-20 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px]"></div>
                        
                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                                Siap Bergabung dengan Komunitas Belajar Kami?
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl mb-12 font-medium">
                                Jadilah bagian dari revolusi pendidikan digital di sekolahmu. 
                                Daftar sekarang dan mulai rasakan kemudahannya.
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-block px-12 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest text-sm"
                            >
                                Buat Akun Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-black">S</span>
                        </div>
                        <span className="text-lg font-black tracking-tight text-slate-800 uppercase">SmartStudy</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium italic">
                        © 2026 SmartStudy E-Learning Platform. Built for Excellence.
                    </p>
                </div>
            </footer>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}
