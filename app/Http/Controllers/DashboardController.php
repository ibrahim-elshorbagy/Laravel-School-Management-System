<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndexStudentResource;
use App\Http\Resources\MyChildrenResource;
use App\Http\Resources\TaskResource;
use App\Models\Student;
use App\Models\Task;
use App\Models\Teacher;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        return inertia('Dashboard');
    }

    public function teacher()
    {

        $teacherId = auth()->user()->teacher->id;

        $classroomIds = Teacher::findOrFail($teacherId)->classrooms()->pluck('classrooms.id'); //get number of class for a teacher
        $classroomInfo = Teacher::findOrFail($teacherId)->classrooms->map(function ($classroom) {
            return [
                'id' => $classroom->id,
                'name' => $classroom->name,
                'level' => $classroom->level->name,
                'grade' => $classroom->grade->name,
            ];
        })->toArray();

        $query = Student::query();
        $students = $query->with('user','level', 'grade', 'classroom')->whereIn('classroom_id', $classroomIds)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Teacher/Pages/Dashboard',[
            'NumberOfClassrooms' => count($classroomIds),
            'NumberOfStudents' => count($students),
            "students" => IndexStudentResource::collection($students),
            'classroomInfo' => $classroomInfo,
        ]);

    }

   

    public function student()
    {
        return inertia('Student/Dashboard');
    }


}
