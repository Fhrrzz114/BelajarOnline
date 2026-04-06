import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nisn: '',
        classroom: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.student.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Personnel Enlistment"
        >
            <Head title="Enlist Student" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                    <div className="p-10">
                        <div className="flex items-center gap-6 mb-12 pb-10 border-b border-slate-50">
                            <div className="h-16 w-16 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Registration Protocol</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Lengkapi metadata identitas untuk otorisasi akses platform.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Identity Name</label>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-black text-slate-900"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-1 ml-1" />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Class Segment Assignment</label>
                                    <TextInput
                                        id="classroom"
                                        name="classroom"
                                        value={data.classroom}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700"
                                        placeholder="e.g. 12-SCIENCE-A"
                                        onChange={(e) => setData('classroom', e.target.value)}
                                    />
                                    <InputError message={errors.classroom} className="mt-1 ml-1" />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Unique NISN ID</label>
                                    <TextInput
                                        id="nisn"
                                        name="nisn"
                                        value={data.nisn}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-black text-slate-900 tracking-tighter"
                                        onChange={(e) => setData('nisn', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nisn} className="mt-1 ml-1" />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Digital Mail Address</label>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700 underline underline-offset-4 decoration-slate-200"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-1 ml-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-10 border-t border-slate-50">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Passkey</label>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-1 ml-1" />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm Secret</label>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-1 ml-1" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                                <Link
                                    href={route('admin.student.index')}
                                    className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-900 transition-all underline underline-offset-8 decoration-slate-100 hover:decoration-slate-900"
                                >
                                    &larr; Discard & Return
                                </Link>
                                <PrimaryButton 
                                    className="px-10 py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200" 
                                    disabled={processing}
                                >
                                    {processing ? 'SYNCING...' : 'Authorize Registration'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
