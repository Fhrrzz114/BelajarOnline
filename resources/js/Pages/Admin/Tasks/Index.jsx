import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, tasks }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Task Management"
        >
            <Head title="Manage Tasks" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert / Flash Message */}
                {(flash?.success) && (
                    <div className="mb-8 p-5 bg-violet-50 border-l-4 border-violet-500 rounded-r-xl flex items-center shadow-xl shadow-violet-100/50 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="h-10 w-10 bg-violet-100 rounded-lg flex items-center justify-center mr-4">
                            <svg className="h-6 w-6 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-black text-violet-600 uppercase tracking-widest leading-none">Success</p>
                            <p className="text-sm font-bold text-slate-700 mt-1">{flash.success}</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Homework List</h2>
                        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Broadcast new assignments to selected classes.</p>
                    </div>
                    <Link
                        href={route('admin.task.create')}
                        className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Generate Task
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment Info</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Class</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Submission Date</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {tasks.data.length > 0 ? tasks.data.map((task) => (
                                    <tr key={task.id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="font-black text-slate-900 text-base tracking-tight leading-none mb-2">{task.title}</div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-xs font-bold text-slate-400 line-clamp-1">{task.description || 'No description provided'}</div>
                                                {task.file_path && (
                                                    <a 
                                                        href={`/storage/${task.file_path}`} 
                                                        target="_blank" 
                                                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-violet-600 bg-violet-50 px-2.5 py-1 rounded tracking-widest hover:bg-violet-100 transition-colors uppercase"
                                                        title="Download Attachment"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" /></svg>
                                                        Attachment
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1.5 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest border border-slate-800 shadow-lg shadow-slate-100">
                                                Class {task.classroom}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-slate-700 tracking-tight bg-slate-50 inline-block px-3 py-1 rounded border border-slate-100">
                                                {new Date(task.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <Link
                                                    href={route('admin.task.show', task.id)}
                                                    className="p-2.5 text-cyan-600 hover:bg-cyan-50 rounded transition-all border border-transparent hover:border-cyan-100 shadow-sm hover:shadow-cyan-100/50"
                                                    title="View Submissions"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.task.edit', task.id)}
                                                    className="p-2.5 text-violet-600 hover:bg-violet-50 rounded transition-all border border-transparent hover:border-violet-100 shadow-sm hover:shadow-violet-100/50"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.task.destroy', task.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2.5 text-rose-600 hover:bg-rose-50 rounded transition-all border border-transparent hover:border-rose-100 shadow-sm hover:shadow-rose-100/50"
                                                    onBefore={() => confirm('Delete this assignment permanently?')}
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="inline-flex h-16 w-16 bg-slate-50 rounded-full items-center justify-center text-slate-300 mb-4 opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </div>
                                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">No assignments found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination (Simple) */}
                {tasks.last_page > 1 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {tasks.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-5 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-all ${link.active ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-100'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
