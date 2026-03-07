import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Pengaturan Profil</h2>}
        >
            <Head title="Profil Saya" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 mb-10 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black border border-white/20 shadow-inner">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black mb-1">{user.name}</h1>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                            {user.role === 'admin' ? 'Administrator' : 'Murid'}
                                        </span>
                                        {user.classroom && (
                                            <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                                Kelas {user.classroom}
                                            </span>
                                        )}
                                        {user.nisn && (
                                            <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                                NISN: {user.nisn}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-[-30px] bottom-[-30px] opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Profile Info Card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Informasi Dasar</h3>
                                            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Pembaruan Nama & Email</p>
                                        </div>
                                    </div>
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>
                            </div>

                            {/* Password Card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Keamanan</h3>
                                            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Ubah Kata Sandi Akun</p>
                                        </div>
                                    </div>
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Status Card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Status Akun</h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-500">Tipe Akun</span>
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg border border-indigo-100">
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-500">Terdaftar Pada</span>
                                        <span className="text-sm font-black text-gray-800">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-500">Email Verifikasi</span>
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg border ${user.email_verified_at ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {user.email_verified_at ? 'Terverifikasi' : 'Belum'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Card */}
                            <div className="bg-red-50/30 rounded-3xl border border-red-100 p-8">
                                <div className="flex items-center gap-3 mb-6 text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <h4 className="text-sm font-black uppercase tracking-widest">Zona Bahaya</h4>
                                </div>
                                <p className="text-xs text-red-500/70 font-bold mb-6 leading-relaxed">
                                    Tindakan ini tidak dapat dibatalkan. Menghapus akun akan menghapus semua data Anda secara permanen.
                                </p>
                                <DeleteUserForm className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
