import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Edit({ auth, task, classrooms }) {
    const [subjects, setSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        title: task.title,
        subject: task.subject || '',
        description: task.description || '',
        classroom: task.classroom,
        due_date: task.due_date,
        file: null,
    });

    useEffect(() => {
        if (data.classroom) {
            setLoadingSubjects(true);
            axios.get(route('admin.task.subjects', { classroom: data.classroom }))
                .then(response => {
                    setSubjects(response.data);
                    setLoadingSubjects(false);
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                    setLoadingSubjects(false);
                });
        }
    }, [data.classroom]);

    const handleSubjectChange = (e) => {
        const val = e.target.value;
        setData(prev => ({
            ...prev,
            subject: val,
            title: val ? `Tugas ${val}` : prev.title
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.task.update', task.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Edit Assignment"
        >
            <Head title="Modify Task" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                        <div className="p-10">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="h-16 w-16 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-2xl shadow-violet-200 ring-4 ring-violet-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Update Assignment</h3>
                                    <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Modify existing task details for class {task.classroom}.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    {/* Classroom Selection */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Target Classroom</label>
                                        <select 
                                            className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700 appearance-none cursor-pointer"
                                            value={data.classroom}
                                            onChange={e => setData('classroom', e.target.value)}
                                            required
                                        >
                                            <option value="">-- SELECT CLASS --</option>
                                            {classrooms.map(cls => (
                                                <option key={cls} value={cls}>CLASS {cls}</option>
                                            ))}
                                        </select>
                                        {errors.classroom && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.classroom}</p>}
                                    </div>

                                    {/* Subject Selection (Dynamic) */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Academic Subject</label>
                                        <select 
                                            className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            value={data.subject}
                                            onChange={handleSubjectChange}
                                            disabled={!data.classroom || loadingSubjects}
                                            required
                                        >
                                            <option value="">{loadingSubjects ? 'LOADING...' : '-- SELECT SUBJECT --'}</option>
                                            {subjects.map((sub, i) => (
                                                <option key={i} value={sub}>{sub.toUpperCase()}</option>
                                            ))}
                                        </select>
                                        {errors.subject && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.subject}</p>}
                                    </div>

                                    {/* Task Title */}
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Task Title / heading</label>
                                        <input 
                                            type="text" 
                                            className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-black text-slate-900 placeholder:text-slate-300 placeholder:font-bold"
                                            placeholder="e.g. Mathematics - Algebra Basics"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                        />
                                        {errors.title && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.title}</p>}
                                    </div>

                                    {/* Due Date */}
                                    <div className="md:col-span-1 space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Submission Deadline</label>
                                        <input 
                                            type="date" 
                                            className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700 cursor-pointer"
                                            value={data.due_date}
                                            onChange={e => setData('due_date', e.target.value)}
                                            required
                                        />
                                        {errors.due_date && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.due_date}</p>}
                                    </div>

                                    {/* File Upload */}
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current & New Attachment</label>
                                        
                                        {task.file_path && !data.file && (
                                            <div className="mb-6 p-5 bg-violet-50/50 rounded-xl border border-violet-100 flex items-center justify-between shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-white rounded flex items-center justify-center shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest leading-none">Stored File:</p>
                                                        <p className="text-xs text-violet-500 font-bold truncate max-w-[250px] mt-1">{task.file_path.split('/').pop()}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] text-white font-black uppercase tracking-widest bg-violet-600 px-3 py-1 rounded shadow-lg shadow-violet-100">Active</span>
                                            </div>
                                        )}

                                        <div className="relative group">
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={e => setData('file', e.target.files[0])}
                                            />
                                            <div className="w-full rounded border-2 border-dashed border-slate-100 bg-slate-50/50 group-hover:bg-violet-50/30 group-hover:border-violet-200 transition-all py-8 px-6 flex items-center gap-6">
                                                <div className="h-12 w-12 rounded bg-white shadow-xl shadow-slate-100 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-slate-700 uppercase tracking-tight">
                                                        {data.file ? data.file.name : 'Select new file to override attachment'}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Leave empty to keep current file.</p>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.file && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.file}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Instructional context</label>
                                        <textarea 
                                            rows="5"
                                            className="w-full rounded border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-violet-50 focus:border-violet-600 transition-all py-4 px-5 shadow-sm font-bold text-slate-700 placeholder-slate-300"
                                            placeholder="Outline the steps and requirements for this assignment..."
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                        ></textarea>
                                        {errors.description && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.description}</p>}
                                    </div>
                                </div>

                                <div className="pt-10 flex gap-6 border-t border-slate-50">
                                    <Link
                                        href={route('admin.task.index')}
                                        className="flex-1 py-5 bg-white text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] rounded border border-slate-100 hover:bg-slate-50 hover:text-slate-900 transition-all text-center"
                                    >
                                        Discard Changes
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="flex-[2] py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded hover:bg-violet-600 transition-all shadow-2xl shadow-slate-200 disabled:opacity-50"
                                    >
                                        {processing ? 'SYNCING...' : 'Update Assignment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
