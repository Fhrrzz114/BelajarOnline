import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, recent_submissions, recent_attendance }) {
    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header="Executive Overview"
        >
            <Head title="Admin Control Center" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-900 rounded-xl p-10 mb-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-cyan-500/20 transition-all duration-1000"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-3 tracking-tight">System Status: <span className="text-cyan-400">Operational</span></h2>
                        <p className="text-slate-400 font-bold max-w-xl uppercase tracking-widest text-xs leading-relaxed">
                            Welcome back, {auth.user.name}. Monitor student velocity, teacher throughput, and real-time attendance metrics from this central command.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Students', value: stats.total_students, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-violet-600 bg-violet-50', shadow: 'shadow-violet-100' },
                        { label: 'Total Educators', value: stats.total_teachers, icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zM9 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-cyan-600 bg-cyan-50', shadow: 'shadow-cyan-100' },
                        { label: 'Active Classes', value: stats.active_classes, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'text-slate-900 bg-slate-100', shadow: 'shadow-slate-100' },
                        { label: 'Today Presence', value: stats.today_attendance, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-rose-600 bg-rose-50', shadow: 'shadow-rose-100' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 hover:border-violet-100 transition-all group active:scale-95">
                            <div className="flex items-center gap-6">
                                <div className={`${stat.color} h-14 w-14 rounded flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={stat.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tight mt-1">{stat.value}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Submissions Section */}
                        <div>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                        Recent Submissions
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Last 5 active events</p>
                                </div>
                                <Link href={route('admin.task.index')} className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] hover:text-violet-700 underline underline-offset-8">Browse All</Link>
                            </div>
                            <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden">
                                {recent_submissions.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="border-b border-slate-50">
                                                <tr>
                                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student</th>
                                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment</th>
                                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                                    <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50/50">
                                                {recent_submissions.map((sub) => (
                                                    <tr key={sub.id} className="hover:bg-slate-50/30 transition-all group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-100">
                                                                    {sub.user.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="text-sm font-black text-slate-900 tracking-tight">{sub.user.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="text-sm font-bold text-slate-500 truncate block max-w-[200px]">{sub.task.title}</span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            {sub.score ? (
                                                                <span className="px-3 py-1.5 bg-violet-600 text-white text-[10px] font-black rounded uppercase tracking-widest shadow-lg shadow-violet-100 italic">Grade: {sub.score}</span>
                                                            ) : (
                                                                <span className="px-3 py-1.5 bg-rose-50 text-rose-500 text-[10px] font-black rounded border border-rose-100 uppercase tracking-widest">Pending</span>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <Link href={route('admin.task.show', sub.task_id)} className="inline-flex h-9 w-9 bg-slate-50 rounded items-center justify-center text-slate-900 hover:bg-violet-600 hover:text-white transition-all shadow-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-20 text-center">
                                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] italic">No submission signals detected.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Attendance Log Section */}
                        <div>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                        Presence Stream
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Real-time authentication data</p>
                                </div>
                                <Link href={route('admin.attendance.index')} className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em] hover:text-violet-700 underline underline-offset-8">Historical Log</Link>
                            </div>
                            <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden divide-y divide-slate-50">
                                {recent_attendance.length > 0 ? (
                                    recent_attendance.map((att) => (
                                        <div key={att.id} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50/30 transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-200 group-hover:bg-white group-hover:border-violet-100 transition-all">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-violet-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-slate-900 tracking-tight leading-none mb-1">{att.user.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{att.user.nisn} • CLASS {att.user.classroom}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-900 tracking-tighter tabular-nums">{att.time_in}</p>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-end gap-1.5 mt-1 ${att.status === 'present' ? 'text-cyan-500' : 'text-rose-500'}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${att.status === 'present' ? 'bg-cyan-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                                    {att.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-20 text-center">
                                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] italic">Waiting for incoming logs...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8">
                                Core Protocols
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: 'Attendance Scanner', href: route('admin.attendance.scanner'), icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z', color: 'bg-rose-500', shadow: 'shadow-rose-100' },
                                    { label: 'Input Exam Grades', href: route('admin.exam-grade.create'), icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-violet-600', shadow: 'shadow-violet-100' },
                                    { label: 'Student Directory', href: route('admin.student.index'), icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-cyan-600', shadow: 'shadow-cyan-100' },
                                    { label: 'Class Promotion', href: route('admin.student.promote.page'), icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'bg-slate-900', shadow: 'shadow-slate-200' }
                                ].map((action, i) => (
                                    <Link
                                        key={i}
                                        href={action.href}
                                        className="bg-white p-6 rounded-xl border border-slate-50 flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        <div className={`${action.color} h-12 w-12 rounded flex items-center justify-center text-white shadow-lg ${action.shadow} group-hover:scale-110 transition-transform`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={action.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] flex-1">{action.label}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 h-24 w-24 bg-white/10 rounded-full -mb-10 -mr-10 blur-2xl"></div>
                            <h4 className="text-xl font-black mb-2 tracking-tight">Need Support?</h4>
                            <p className="text-xs font-bold text-violet-100/80 uppercase tracking-widest leading-relaxed mb-6">Access system documentation and technical guidelines.</p>
                            <button className="w-full py-4 bg-white text-violet-600 font-black text-[10px] uppercase tracking-[0.2em] rounded shadow-lg hover:bg-violet-50 transition-all">Open Wiki</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
