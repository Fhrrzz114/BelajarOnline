import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <button 
                onClick={confirmUserDeletion}
                className="w-full py-3 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 uppercase tracking-widest text-sm"
            >
                Hapus Akun Sekarang
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                        Apakah Anda yakin ingin menghapus akun?
                    </h2>

                    <p className="mt-4 text-sm text-gray-500 font-medium leading-relaxed italic">
                        Semua data, nilai, dan informasi Anda akan dihapus secara permanen dari server kami. Harap masukkan kata sandi Anda untuk mengonfirmasi.
                    </p>

                    <div className="mt-8 space-y-2">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold py-3 px-4"
                            isFocused
                            placeholder="Ketik password Anda di sini..."
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={closeModal}
                            className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
                        >
                            Batal
                        </button>

                        <button 
                            disabled={processing}
                            className="flex-1 py-3 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50 text-sm uppercase tracking-widest"
                        >
                            Hapus Akun
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
