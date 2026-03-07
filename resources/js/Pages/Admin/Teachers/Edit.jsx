import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, teacher }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: teacher.name,
        email: teacher.email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.teacher.update', teacher.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`Edit Guru: ${teacher.name}`}
        >
            <Head title="Edit Guru" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
                            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Ubah Data Guru</h3>
                                <p className="text-sm text-gray-500">Perbarui informasi profil atau ganti password untuk akun ini.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-700 font-bold mb-1" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-bold mb-1" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ganti Password (Opsional)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="password" value="Password Baru" className="text-gray-700 font-bold mb-1" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password Baru" className="text-gray-700 font-bold mb-1" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full rounded-xl border-gray-200 focus:ring-indigo-500"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                                <Link
                                    href={route('admin.teacher.index')}
                                    className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    &larr; Kembali ke Daftar
                                </Link>
                                <PrimaryButton 
                                    className="px-8 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 ring-offset-2 border-none" 
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Perbarui Data Guru'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
