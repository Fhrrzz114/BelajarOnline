import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scanner({ auth }) {
    const { flash } = usePage().props;
    const [scannedResult, setScannedResult] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: '',
    });

    useEffect(() => {
        let scanner = new Html5QrcodeScanner("reader", { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            rememberLastUsedCamera: true,
            supportedScanTypes: [0] // 0 = QR CODE
        });

        scanner.render(onScanSuccess, onScanError);

        function onScanSuccess(decodedText, decodedResult) {
            scanner.clear();
            setIsScanning(false);
            setScannedResult(decodedText);
            
            // Submit the NISN
            router.post(route('admin.attendance.store'), { nisn: decodedText }, {
                preserveScroll: true,
                onSuccess: () => {
                    setTimeout(() => {
                        setIsScanning(true);
                        scanner.render(onScanSuccess, onScanError);
                        setScannedResult(null);
                    }, 3000);
                },
                onError: () => {
                   setTimeout(() => {
                        setIsScanning(true);
                        scanner.render(onScanSuccess, onScanError);
                        setScannedResult(null);
                    }, 3000);
                }
            });
        }

        function onScanError(err) {
            // silent fail for scanning frames
        }

        return () => {
            scanner.clear();
        };
    }, []);

    // Manual fallback submit if needed
    const handleManualSubmit = (e) => {
        e.preventDefault();
        post(route('admin.attendance.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Biometric Verification"
        >
            <Head title="Attendance Scanner" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none text-center">Identity Capture Terminal</h2>
                    <p className="text-sm font-bold text-slate-400 mt-3 uppercase tracking-[0.25em] text-center italic">Scanning for active credentials via optical interface.</p>
                </div>

                {/* Alert / Flash Message */}
                {(flash?.message || flash?.success || flash?.error) && (
                    <div className={`mb-10 p-5 rounded-xl flex items-center shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-500 ${flash?.error ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-slate-900 text-white shadow-slate-200'}`}>
                        <div className={`h-10 w-10 rounded mr-5 flex items-center justify-center bg-white/10`}>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={flash?.error ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"} />
                            </svg>
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] flex-1">
                            {flash.message || flash.success || flash.error}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Scanner Section */}
                    <div className="lg:col-span-7 bg-white p-10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-12 w-12 rounded bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Sensor Interface</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Optical scan enabled</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div id="reader" className="overflow-hidden rounded border-none shadow-2xl shadow-slate-200 aspect-square lg:aspect-video bg-slate-50"></div>
                            <div className="absolute inset-0 pointer-events-none border-[16px] border-white/10 rounded"></div>
                        </div>
                        
                        {!isScanning && (
                            <div className="mt-8 p-6 bg-slate-900 text-white rounded shadow-2xl shadow-slate-200 flex items-center justify-center font-black text-[10px] uppercase tracking-[0.25em] animate-pulse">
                                <svg className="animate-spin -ml-1 mr-4 h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating Identity...
                            </div>
                        )}
                    </div>

                    {/* Manual Input Section */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        <div className="bg-white p-10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded bg-violet-50 text-violet-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Manual Override</h3>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8 italic">Execute protocol manually if sensor hardware fails or QR fidelity is compromised.</p>
                            
                            <form onSubmit={handleManualSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Input NISN ID</label>
                                    <input 
                                        type="text" 
                                        value={data.nisn}
                                        onChange={e => setData('nisn', e.target.value)}
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-5 px-6 shadow-sm font-black text-slate-900 placeholder:text-slate-300 placeholder:font-bold"
                                        placeholder="Ex: 1029384756"
                                        required
                                    />
                                    {errors.nisn && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.nisn}</p>}
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'SYNCING...' : 'Authorize Ingress'}
                                </button>
                            </form>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 italic">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed text-center">
                                All authentication events are encrypted and logged for system security audits.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
