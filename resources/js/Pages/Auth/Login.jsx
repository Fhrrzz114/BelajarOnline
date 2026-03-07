import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Akun" />

            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Selamat Datang!</h2>
                <p className="text-slate-400 font-medium">Silakan masuk untuk melanjutkan belajar.</p>
            </div>

            {status && <div className="mb-6 px-4 py-3 bg-green-50 text-green-600 rounded-xl text-sm font-bold border border-green-100">{status}</div>}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email / Username</label>
                    <div className="relative group">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-4 px-5 font-bold text-slate-700"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                    </div>
                    <InputError message={errors.email} className="mt-2 ml-1" />
                </div>

                <div>
                    <div className="flex justify-between items-center ml-1 mb-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Password</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                            >
                                Lupa Password?
                            </Link>
                        )}
                    </div>
                    <div className="relative group">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-4 px-5 font-bold text-slate-700"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <InputError message={errors.password} className="mt-2 ml-1" />
                </div>

                <div className="flex items-center justify-between py-2">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            className="rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-3 text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Ingat saya</span>
                    </label>
                </div>

                <div className="pt-2">
                    <button 
                        disabled={processing}
                        className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {processing ? 'Mencoba Masuk...' : 'Masuk Sekarang'}
                    </button>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm font-bold text-slate-400">
                            Belum punya akun?{' '}
                            <Link
                                href={route('register')}
                                className="text-indigo-500 hover:text-indigo-600 transition-colors"
                            >
                                Daftar Gratis
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
