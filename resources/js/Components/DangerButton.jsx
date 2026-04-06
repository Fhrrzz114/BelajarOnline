export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-rose-500 border border-rose-400 rounded font-black text-[10px] text-white uppercase tracking-[0.2em] hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all duration-300 shadow-lg shadow-rose-100 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
