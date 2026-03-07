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
            header="Scan QR Absensi"
        >
            <Head title="Scanner Absensi" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert / Flash Message */}
                {(flash?.message || flash?.success || flash?.error) && (
                    <div className={`mb-6 p-4 border-l-4 rounded-r-lg flex items-center shadow-sm ${flash?.error ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'}`}>
                        <svg className={`h-5 w-5 mr-3 ${flash?.error ? 'text-red-400' : 'text-green-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className={`text-sm font-medium ${flash?.error ? 'text-red-800' : 'text-green-800'}`}>
                            {flash.message || flash.success || flash.error}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Scanner Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Scanner Kamera</h3>
                        </div>

                        <div id="reader" className="overflow-hidden rounded-2xl border-none"></div>
                        
                        {!isScanning && (
                            <div className="mt-4 p-4 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-bold">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses Absensi...
                            </div>
                        )}
                    </div>

                    {/* Manual Input Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Input Manual</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Gunakan jika kamera tidak berfungsi atau QR code rusak.</p>
                        
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Masukkan NISN</label>
                                <input 
                                    type="text" 
                                    value={data.nisn}
                                    onChange={e => setData('nisn', e.target.value)}
                                    className="w-full rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 py-3"
                                    placeholder="Ex: 12345678"
                                    required
                                />
                                {errors.nisn && <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Catat Absensi'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
