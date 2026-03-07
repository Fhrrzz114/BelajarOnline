import React from 'react';
import { Link } from '@inertiajs/react';

const SidebarItem = ({ href, active, children, icon }) => {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
        >
            <span className={`mr-3 ${active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`}>
                {icon}
            </span>
            {children}
        </Link>
    );
};

export default function Sidebar({ user }) {
    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64 fixed left-0 top-0 z-40">
            <div className="flex items-center justify-center h-16 border-b border-gray-100 flex-shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                        AL
                    </div>
                    <span className="text-xl font-black text-gray-800 tracking-tight">AcademyLink</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                
                <SidebarItem 
                    href={route('dashboard')} 
                    active={route().current('dashboard')}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                >
                    Dashboard
                </SidebarItem>

                {user.role === 'user' && (
                    <SidebarItem 
                        href={route('user.schedules.index')} 
                        active={route().current('user.schedules.index')}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    >
                        Jadwal Pelajaran
                    </SidebarItem>
                )}

                {user.role === 'user' && (
                    <SidebarItem 
                        href={route('user.grades.index')} 
                        active={route().current('user.grades.index')}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                    >
                        Laporan Nilai
                    </SidebarItem>
                )}

                {user.role === 'admin' && (
                    <>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Administrative</p>
                        <SidebarItem 
                            href={route('admin.student.index')} 
                            active={route().current('admin.student.*') && !route().current('admin.student.promote.page')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        >
                            Manajemen Siswa
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.student.promote.page')} 
                            active={route().current('admin.student.promote.page')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        >
                            Kenaikan Kelas
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.teacher.index')} 
                            active={route().current('admin.teacher.*')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zM9 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        >
                            Kelola Guru
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.attendance.index')} 
                            active={route().current('admin.attendance.*')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
                        >
                            Log Absensi
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.task.index')} 
                            active={route().current('admin.task.*')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                        >
                            Kelola Tugas
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.exam-grade.index')} 
                            active={route().current('admin.exam-grade.*')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        >
                            Nilai UTS/UAS
                        </SidebarItem>

                        <SidebarItem 
                            href={route('admin.schedules.index')} 
                            active={route().current('admin.schedules.*')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        >
                            Kelola Jadwal
                        </SidebarItem>
                    </>
                )}

                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Settings</p>
                <SidebarItem 
                    href={route('profile.edit')} 
                    active={route().current('profile.edit')}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                >
                    My Profile
                </SidebarItem>
            </div>

            <div className="p-4 border-t border-gray-100">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </Link>
            </div>
        </div>
    );
}
