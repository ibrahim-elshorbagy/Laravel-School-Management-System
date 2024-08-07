<?php

use App\Http\Controllers\AccountantController;
use App\Http\Controllers\AccountantDashboardController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\FeeInvoiceController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GraduatedController;
use App\Http\Controllers\GuardianController;
use App\Http\Controllers\GuardianMyChildrenController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MyExamsController;
use App\Http\Controllers\Pay;
use App\Http\Controllers\ProcessingFeeController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReceiptStudentController;
use App\Http\Controllers\StudentServicesManagerController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleManagerMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherExamController;



//----------------------- /
Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        switch ($user->role) {
            case 'teacher':
                return redirect()->route('teacher.dashboard');
            case 'guardian':
                return redirect()->route('guardian.dashboard');
            case 'student':
                return redirect()->route('student.dashboard');
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'accountant':
                return redirect()->route('accountant.dashboard');
            case 'StudentServicesManager':
                return redirect()->route('StudentServicesManager.dashboard');
            default:
                return redirect('/login');
        }
    }
    return redirect('/login');
})->name('/');


//----------------------- teacher

Route::middleware(['auth', 'verified', 'role:teacher'])->group(function () {

    Route::get('teacher/dashboard', [DashboardController::class, 'teacher'])->name('teacher.dashboard');
    Route::resource('My-Student-Attendance', AttendanceController::class)->except(['index']);

    Route::resource('My-exams', TeacherExamController::class);

});

//----------------------- guardian

Route::middleware(['auth', 'verified', 'role:guardian'])->group(function () {

    Route::get('guardian/dashboard', [GuardianMyChildrenController::class, 'guardian'])->name('guardian.dashboard');
    Route::get('guardian/MyChildren', [GuardianMyChildrenController::class, 'MyChildren'])->name('guardian.MyChildren');
    Route::get('guardian/MyChildren/{id}/ShowExams', [GuardianMyChildrenController::class, 'ShowExams'])->name('guardian.MyChildren.ShowExams');
    Route::get('guardian/MyChildren/Payments', [GuardianMyChildrenController::class, 'MyChildrenPayments'])->name('guardian.MyChildrenPayments');


});

//----------------------- StudentServicesManager

Route::middleware(['auth', 'verified', 'role:StudentServicesManager'])->group(function () {

    Route::get('StudentServicesManager/dashboard', [DashboardController::class, 'StudentServicesManager'])->name('StudentServicesManager.dashboard');

    Route::resource('student', StudentController::class);
    Route::resource('promotion',PromotionController::class);
    Route::resource('graduated',GraduatedController::class);
    Route::resource('guardian', GuardianController::class);
    Route::resource('student-attendances', AttendanceController::class);
    Route::resource('subject',SubjectController::class);
});

//----------------------- accountant

Route::middleware(['auth', 'verified', 'role:accountant'])->group(function () {

    Route::get('accountant/dashboard', [AccountantDashboardController::class, 'accountant'])->name('accountant.dashboard');
    Route::get('accountant/students', [AccountantDashboardController::class, 'students'])->name('accountant.students');

    Route::resource('fee',FeeController::class);
    Route::resource('fee-invoice',FeeInvoiceController::class);
    Route::resource('receipt-student',ReceiptStudentController::class);
    Route::resource('processing-fee', ProcessingFeeController::class);

    Route::get('payment-settings',[Pay::class,'methods'])->name('payment-methods');
    Route::post('payment',[Pay::class,'pay'])->name('pay');

});

//----------------------- student

Route::middleware(['auth', 'verified', 'role:student'])->group(function () {

    Route::get('student/dashboard', [DashboardController::class, 'student'])->name('student.dashboard');
    Route::resource('MyExam', MyExamsController::class);

});


//----------------------- admin

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

Route::get('admin/dashboard',[DashboardController::class,'admin'])->name('admin.dashboard');

    Route::resource('grade', GradeController::class);
    Route::resource('level', LevelController::class);
    Route::resource('classroom', ClassroomController::class);

    Route::resource('exam',ExamController::class);

    Route::resource('teacher',TeacherController::class);
    Route::resource('accountant',AccountantController::class);
    Route::resource('student-services-managers', StudentServicesManagerController::class);


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
