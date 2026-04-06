import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Promote({ auth, classrooms, students, filters }) {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        target_classroom: '',
        student_ids: [],
    });

    const handleClassroomChange = (classroom) => {
        router.get(route('admin.student.promote.page'), { classroom }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleStudent = (id) => {
        setSelectedStudents(prev => 
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map(s => s.id));
        }
    };

    useEffect(() => {
        setData('student_ids', selectedStudents);
    }, [selectedStudents]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedStudents.length === 0) {
            alert('Pilih setidaknya satu siswa untuk dinaikkan kelas.');
            return;
        }
        if (!confirm(`Yakin ingin menaikkan ${selectedStudents.length} siswa ke kelas ${data.target_classroom}?`)) {
            return;
        }
        post(route('admin.student.promote.bulk'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Lifecycle Promotion"
        >
            <Head title="Class Promotion" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden mb-20">
                    <div className="p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 pb-12 border-b border-slate-50">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Segment Migration</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Batch upgrade for personnel to the subsequent operations segment.</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Operations Segment</label>
                                    <select 
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-5 px-6 shadow-sm font-black text-slate-900 uppercase tracking-widest text-[10px] appearance-none"
                                        value={filters.classroom || ''}
                                        onChange={e => handleClassroomChange(e.target.value)}
                                    >
                                        <option value="">SELECT ORIGIN</option>
                                        {classrooms.map(cls => (
                                            <option key={cls} value={cls}>CLASS {cls}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Target Ops Segment</label>
                                    <input 
                                        type="text"
                                        className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-5 px-6 shadow-sm font-black text-slate-900 uppercase tracking-widest text-[10px] placeholder:text-slate-300"
                                        placeholder="EX: XII-ALPHA, SEGMENT-2, ETC."
                                        value={data.target_classroom}
                                        onChange={e => setData('target_classroom', e.target.value)}
                                        required
                                    />
                                    {errors.target_classroom && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.target_classroom}</p>}
                                </div>
                            </div>

                            {students.length > 0 && (
                                <div className="mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="flex justify-between items-end mb-8 px-2">
                                        <div className="space-y-1">
                                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Personnel Selection Matrix</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{selectedStudents.length} / {students.length} SELECTED FOR MIGRATION</p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={toggleAll}
                                            className="text-[10px] font-black text-violet-600 hover:text-violet-800 transition-colors uppercase tracking-[0.2em] underline underline-offset-4"
                                        >
                                            {selectedStudents.length === students.length ? 'DESELECT ALL' : 'SELECT ENTIRE BATCH'}
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-hidden rounded border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/50 border-b border-slate-50">
                                                    <th className="px-8 py-5 w-20 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Identity</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">NISN ID</th>
                                                    <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Class</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {students.map(student => (
                                                    <tr 
                                                        key={student.id} 
                                                        className={`hover:bg-slate-50/50 transition-all cursor-pointer group ${selectedStudents.includes(student.id) ? 'bg-violet-50/30' : ''}`}
                                                        onClick={() => toggleStudent(student.id)}
                                                    >
                                                        <td className="px-8 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                                                            <div className="relative flex justify-center items-center">
                                                                <input 
                                                                    type="checkbox"
                                                                    className="rounded border-slate-200 text-slate-900 focus:ring-slate-900 h-5 w-5 transition-all cursor-pointer"
                                                                    checked={selectedStudents.includes(student.id)}
                                                                    onChange={() => toggleStudent(student.id)} 
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 font-black text-slate-900 tracking-tight">{student.name}</td>
                                                        <td className="px-8 py-5 font-black text-slate-400 tracking-tighter text-center tabular-nums text-xs">{student.nisn}</td>
                                                        <td className="px-8 py-5 text-center">
                                                            <span className="bg-white px-3 py-1.5 rounded text-[10px] font-black text-slate-600 border border-slate-100 uppercase tracking-widest">
                                                                {student.classroom}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {filters.classroom && students.length === 0 && (
                                <div className="py-24 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">No active personnel detected in the current segment.</p>
                                </div>
                            )}

                            <div className="pt-12 border-t border-slate-50">
                                <button 
                                    type="submit" 
                                    disabled={processing || selectedStudents.length === 0 || !data.target_classroom}
                                    className="w-full py-6 bg-slate-900 text-white font-black rounded text-[10px] uppercase tracking-[0.3em] hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-30 disabled:shadow-none"
                                >
                                    {processing ? 'EXECUTING MIGRATION PROTOCOL...' : `Authorize Promotion for ${selectedStudents.length} Personnel`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
