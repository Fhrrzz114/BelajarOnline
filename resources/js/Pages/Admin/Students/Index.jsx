import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';

export default function Index({ auth, students, classrooms, filters }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Data Siswa"
        >
            <Head title="Data Siswa" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert / Flash Message */}
                {(flash?.message || flash?.success) && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg flex items-center shadow-sm">
                        <svg className="h-5 w-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium text-green-800">{flash.message || flash.success}</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Table Header / Toolbar */}
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative">
                                <select
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer shadow-sm"
                                    value={filters.classroom || ''}
                                    onChange={(e) => router.get(route('admin.student.index'), { classroom: e.target.value }, { preserveState: true })}
                                >
                                    <option value="">Semua Kelas</option>
                                    {classrooms.map((cls) => (
                                        <option key={cls} value={cls}>Kelas {cls}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <input
                                type="file"
                                id="import-excel"
                                className="hidden"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        const formData = new FormData();
                                        formData.append('file', e.target.files[0]);
                                        router.post(route('admin.student.import'), formData);
                                    }
                                }}
                            />
                            <label
                                htmlFor="import-excel"
                                className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer shadow-sm gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Import Excel
                            </label>

                            <a
                                href={route('admin.student.template')}
                                className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-400 hover:bg-gray-50 transition-all gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Unduh Template
                            </a>

                            <Link
                                href={route('admin.student.create')}
                                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 border border-transparent rounded-xl font-bold text-sm text-white hover:bg-indigo-700 transition-all duration-150 shadow-lg shadow-indigo-100 gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Tambah Siswa
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead>
                                <tr className="bg-white">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Profil / Nama</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Kelas</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">NISN</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">QR Identitas</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {students.length > 0 ? students.map((student) => (
                                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-800">{student.name}</div>
                                                    <div className="text-xs text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-tighter">
                                                {student.classroom || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-500 font-semibold">{student.nisn}</td>
                                        <td className="px-6 py-4">
                                            {student.nisn ? (
                                                <div className="p-1 bg-white border border-gray-200 rounded-lg inline-block shadow-sm group-hover:scale-110 transition-transform">
                                                    <QRCodeSVG value={student.nisn} size={48} />
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.student.edit', student.id)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.student.destroy', student.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    onBefore={() => confirm('Hapus data siswa ini?')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">Data siswa tidak ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
