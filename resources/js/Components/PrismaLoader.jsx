import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function PrismaLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const startHandler = () => setLoading(true);
        const finishHandler = () => {
            // Add a small delay for the animation to be meaningful
            setTimeout(() => setLoading(false), 500);
        };

        const unbindStart = router.on('start', startHandler);
        const unbindFinish = router.on('finish', finishHandler);

        return () => {
            unbindStart();
            unbindFinish();
        };
    }, []);

    return (
        <div className={`loader-overlay ${loading ? 'active' : ''}`}>
            <div className="flex flex-col items-center gap-8">
                <div className="saturn-loader-container">
                    <div className="saturn">
                        <div className="planet"></div>
                        <div className="saturn-ring"></div>
                        <div className="saturn-ring saturn-ring-2"></div>
                        <div className="saturn-ring saturn-ring-3"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">
                        Memuat<span className="animate-pulse">...</span>
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        SmartStudy Ecosystem
                    </p>
                </div>
            </div>
        </div>
    );
}
