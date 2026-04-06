import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';

export default function Index({ auth, students, classrooms, filters }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Student Registry"
        >
            <Head title="Student Management" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert / Flash Message */}
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
                    {/* Table Header / Toolbar */}
                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-slate-50/30">
                        <div className="space-y-3 w-full md:w-auto">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Filter by Class</label>
                            <div className="relative group">
                                <select
                                    className="w-full md:w-64 appearance-none pl-6 pr-12 py-4 bg-white border border-slate-100 rounded text-[10px] font-black text-slate-900 uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all cursor-pointer shadow-sm"
                                    value={filters.classroom || ''}
                                    onChange={(e) => router.get(route('admin.student.index'), { classroom: e.target.value }, { preserveState: true })}
                                >
                                    <option value="">ALL SEGMENTS</option>
                                    {classrooms.map((cls) => (
                                        <option key={cls} value={cls}>CLASS {cls}</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-900 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <input
                                type="file"
                                id="import-excel"
                                className="hidden"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        const formData = new FormData();
                                        formData.append('file', e.target.files[0]);
                                        router.post(route('admin.student.import'), formData);
                                    }
                                }}
                            />
                            <label
                                htmlFor="import-excel"
                                className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer shadow-sm gap-3 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Import
                            </label>

                            <Link
                                href={route('admin.student.template')}
                                className="inline-flex h-12 w-12 items-center justify-center bg-white border border-slate-100 rounded text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                                title="Download Template"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </Link>

                            <Link
                                href={route('admin.student.create')}
                                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 gap-3 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Enlist Student
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-50/50">
                            <thead>
                                <tr>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Full Identity</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Class</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">NISN ID</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">QR Credentials</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50/50">Execution</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/30">
                                {students.length > 0 ? students.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="h-12 w-12 rounded bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-100 group-hover:bg-violet-600 transition-colors">
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-slate-900 tracking-tight leading-none mb-1">{student.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded bg-violet-50 text-violet-600 text-[10px] font-black uppercase tracking-widest border border-violet-100">
                                                Class {student.classroom || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-700 tracking-tighter tabular-nums">{student.nisn}</td>
                                        <td className="px-8 py-6">
                                            {student.nisn ? (
                                                <div className="p-1.5 bg-white border border-slate-100 rounded shadow-sm group-hover:shadow-xl group-hover:rotate-3 transition-all duration-500">
                                                    <QRCodeSVG value={student.nisn} size={40} />
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <Link
                                                    href={route('admin.student.edit', student.id)}
                                                    className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 font-bold rounded hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.student.destroy', student.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-rose-300 font-bold rounded hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-95"
                                                    onBefore={() => confirm('Erase student record permanantly?')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No personnel detected in the current segment.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
