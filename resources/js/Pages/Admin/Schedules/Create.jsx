import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, teachers }) {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        user_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.schedules.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<span className="font-black text-slate-800 tracking-tight uppercase text-sm">Module Inventory</span>}
        >
            <Head title="Enlist Module" />

            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-10">
                    <Link
                        href={route('admin.schedules.index')}
                        className="text-slate-300 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
                    >
                        <div className="p-2 border border-slate-100 rounded bg-white shadow-sm transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        Abort & Return
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-12 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-violet-600"></div>
                    
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-black text-slate-900 leading-none uppercase tracking-tighter mb-3">Module Enlistment</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Pair academic modules with authorized personnel for the central vault.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-10">
                        {/* Subject Name */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Academic Subject Identity</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-100 rounded px-6 py-5 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 font-black text-slate-900 transition-all placeholder:text-slate-200 uppercase tracking-tight"
                                placeholder="EX: ADVANCED CALCULUS"
                                required
                            />
                            {errors.subject && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.subject}</div>}
                        </div>

                        {/* Teacher Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Assigned Personnel</label>
                            <div className="relative">
                                <select
                                    value={data.user_id}
                                    onChange={e => setData('user_id', e.target.value)}
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded px-6 py-5 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 font-black text-slate-900 transition-all appearance-none cursor-pointer uppercase tracking-tight"
                                    required
                                >
                                    <option value="">SELECT FACULTY</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id} className="text-slate-900">{t.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            {errors.user_id && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.user_id}</div>}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-6 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'SYNCHRONIZING...' : 'Authorize Vault Entry'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 p-8 bg-slate-50/50 rounded border border-slate-100 flex gap-6 items-start">
                    <div className="bg-white p-3 rounded shadow-sm text-slate-900 border border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-2">Protocol Note</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose italic">
                            Modules registered here are committed to the **Central Vault**. Once inventory is complete, initiate the **"Auto-Generator"** protocol to deploy optimized cycles.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
