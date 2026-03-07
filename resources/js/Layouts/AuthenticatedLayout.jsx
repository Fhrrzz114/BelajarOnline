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
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center">
                            {/* Mobile Toggle Button */}
                            <button
                                onClick={() => setShowingMobileMenu(true)}
                                className="p-2 mr-2 text-gray-500 md:hidden hover:bg-gray-100 rounded-md"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            {header && (
                                <div className="text-xl font-bold text-gray-800">
                                    {header}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                                <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
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
