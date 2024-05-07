<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GuardianController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');

Route::get('task/my-task',[TaskController::class,'myTasks'])->name('task.myTasks');

Route::resource('project',ProjectController::class);
Route::resource('task',TaskController::class);
Route::resource('user',UserController::class);

Route::resource('grade', GradeController::class);
Route::resource('level', LevelController::class);
Route::resource('classroom', ClassroomController::class);
Route::resource('guardian', GuardianController::class);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
