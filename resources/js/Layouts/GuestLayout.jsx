import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="z-10 w-full sm:max-w-md px-6">
                <div className="flex justify-center mb-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="h-14 w-14 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white text-2xl font-black">A</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tight text-slate-800 leading-none">AcademyLink</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Educational Platform</span>
                        </div>
                    </Link>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-indigo-100/50 overflow-hidden rounded-[2.5rem] transition-all">
                    <div className="p-10">
                        {children}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm font-medium text-slate-400">
                        © 2026 AcademyLink. Built for Excellence.
                    </p>
                </div>
            </div>
        </div>
    );
}
