<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return redirect(App\Providers\RouteServiceProvider::redirectTo());
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [App\Http\Controllers\DashboardController::class, 'adminIndex'])->name('admin.dashboard');

    Route::resource('admin/students', App\Http\Controllers\Admin\StudentController::class)
        ->names('admin.student')
        ->parameters(['students' => 'student']);
    Route::get('admin/students-promote', [App\Http\Controllers\Admin\StudentController::class, 'promotePage'])->name('admin.student.promote.page');
    Route::post('admin/students-promote', [App\Http\Controllers\Admin\StudentController::class, 'bulkPromote'])->name('admin.student.promote.bulk');
    Route::post('admin/students/import', [App\Http\Controllers\Admin\StudentController::class, 'import'])->name('admin.student.import');
    Route::get('admin/students/template', [App\Http\Controllers\Admin\StudentController::class, 'downloadTemplate'])->name('admin.student.template');

    Route::resource('admin/teachers', App\Http\Controllers\Admin\TeacherController::class)
        ->names('admin.teacher')
        ->parameters(['teachers' => 'teacher']);

    Route::get('admin/attendance', [App\Http\Controllers\Admin\AttendanceController::class, 'index'])->name('admin.attendance.index');
    Route::get('admin/attendance/export', [App\Http\Controllers\Admin\AttendanceController::class, 'export'])->name('admin.attendance.export');
    Route::get('admin/attendance/scanner', [App\Http\Controllers\Admin\AttendanceController::class, 'scanner'])->name('admin.attendance.scanner');
    Route::post('admin/attendance/scan', [App\Http\Controllers\Admin\AttendanceController::class, 'store'])->name('admin.attendance.store');

    Route::get('admin/tasks/subjects', [App\Http\Controllers\Admin\TaskController::class, 'getSubjects'])->name('admin.task.subjects');
    Route::resource('admin/tasks', App\Http\Controllers\Admin\TaskController::class)
        ->names('admin.task')
        ->parameters(['tasks' => 'task']);
    Route::get('admin/tasks/{task}/export', [App\Http\Controllers\Admin\TaskController::class, 'export'])->name('admin.task.export');

    Route::patch('admin/submissions/{submission}/grade', [App\Http\Controllers\Admin\TaskSubmissionController::class, 'update'])
        ->name('admin.submissions.grade');
    Route::post('admin/submissions/{submission}/ai-grade', [App\Http\Controllers\Admin\TaskSubmissionController::class, 'aiGrade'])
        ->name('admin.submissions.ai-grade');

    Route::resource('admin/exam-grades', App\Http\Controllers\Admin\ExamGradeController::class)
        ->names('admin.exam-grade')
        ->parameters(['exam-grades' => 'examGrade']);

    Route::resource('admin/schedules', App\Http\Controllers\Admin\ScheduleController::class)
        ->names('admin.schedules');
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/user/dashboard', [App\Http\Controllers\DashboardController::class, 'userIndex'])->name('user.dashboard');

    Route::get('/user/attendance', [App\Http\Controllers\User\HistoryController::class, 'attendance'])->name('user.attendance.index');
    Route::get('/user/tasks', [App\Http\Controllers\User\HistoryController::class, 'tasks'])->name('user.tasks.index');
    Route::post('/user/tasks/{task}/submit', [App\Http\Controllers\Admin\TaskSubmissionController::class, 'store'])->name('user.tasks.submit');
    Route::get('/user/schedules', [App\Http\Controllers\User\ScheduleController::class, 'index'])->name('user.schedules.index');
    Route::get('/user/schedules/download', [App\Http\Controllers\User\ScheduleController::class, 'download'])->name('user.schedules.download');
    Route::get('/user/grades', [App\Http\Controllers\User\GradeController::class, 'index'])->name('user.grades.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
