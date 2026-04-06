import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-slate-200 focus:border-violet-600 focus:ring-4 focus:ring-violet-50 rounded shadow-sm text-sm placeholder:text-slate-300 text-slate-700 transition-all duration-200 ' +
                className
            }
            ref={input}
        />
    );
});
