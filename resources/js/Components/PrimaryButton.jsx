export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-slate-900 border border-slate-800 rounded font-black text-[10px] text-white uppercase tracking-[0.2em] hover:bg-violet-600 focus:bg-violet-700 active:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100 transition-all duration-300 shadow-lg shadow-slate-100 ${
                    disabled && 'opacity-25 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
