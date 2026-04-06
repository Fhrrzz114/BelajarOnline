import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar user={user} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {showingMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    onClick={() => setShowingMobileMenu(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${showingMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar user={user} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:pl-64">
                {/* Top Header Navigation */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center">
                            {/* Mobile Toggle Button */}
                            <button
                                onClick={() => setShowingMobileMenu(true)}
                                className="p-2.5 mr-4 text-slate-400 md:hidden hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            {header && (
                                <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-violet-600 rounded-full hidden sm:block"></span>
                                    {header}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-black text-slate-900 tracking-tight">{user.name}</span>
                                <span className="text-[10px] text-violet-600 font-bold uppercase tracking-widest bg-violet-50 px-2 py-0.5 rounded leading-none mt-1">{user.role}</span>
                            </div>
                            <div className="h-11 w-11 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-black shadow-lg shadow-slate-200 overflow-hidden text-sm ring-4 ring-slate-50 transition-transform hover:scale-105 cursor-pointer">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden">
                    <div className="py-8">
                        {children}
                    </div>
                </main>

                <footer className="bg-white border-t border-gray-100 py-4 px-8 text-center text-sm text-gray-400">
                    &copy; 2026 AcademyLink Educational System.
                </footer>
            </div>
        </div>
    );
}
