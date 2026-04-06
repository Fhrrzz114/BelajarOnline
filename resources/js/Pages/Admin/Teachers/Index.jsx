import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, teachers }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Faculty Registry"
        >
            <Head title="Teachers & Admins" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert Messages */}
                {(flash?.message || flash?.success) && (
                    <div className="mb-10 p-5 bg-slate-900 text-white rounded-xl flex items-center shadow-2xl shadow-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="h-10 w-10 rounded bg-white/10 mr-5 flex items-center justify-center text-cyan-400">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{flash.message || flash.success}</p>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden mb-20">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Personnel Roster</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Authorized faculty and administrative records.</p>
                        </div>
                        <Link
                            href={route('admin.teacher.create')}
                            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 gap-3 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Enlist Faculty
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-50/50">
                            <thead>
                                <tr>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Full Identity</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Authorization Level</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Execution</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/30">
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="h-12 w-12 rounded bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-100 group-hover:bg-cyan-500 transition-colors">
                                                    {teacher.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-slate-900 tracking-tight leading-none mb-1">{teacher.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{teacher.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {teacher.id === auth.user.id ? (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black bg-cyan-50 text-cyan-700 border border-cyan-100 uppercase tracking-widest">
                                                    CURRENT SESSION
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                                                    FACULTY / ADMIN
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <Link
                                                    href={route('admin.teacher.edit', teacher.id)}
                                                    className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 font-bold rounded hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                                                    title="Refine Identity"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </Link>
                                                {teacher.id !== auth.user.id && (
                                                    <Link
                                                        href={route('admin.teacher.destroy', teacher.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-rose-300 font-bold rounded hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-95"
                                                        onBefore={() => confirm('Erase faculty record permanently?')}
                                                        title="Erase Record"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
