<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndexStudentResource;
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

            //work
        $teacherId = auth()->user()->teacher->id;

        $classroomIds = Teacher::findOrFail($teacherId)->classrooms()->pluck('classrooms.id'); //get number of class for a teacher
        $classroomInfo = Teacher::findOrFail($teacherId)->classrooms->map(function ($classroom) {
            return [
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

        // //test
        // $teacherId = auth()->user()->teacher->id;
        // $classroomName = Teacher::findOrFail($teacherId)->classrooms()->pluck('name')->toArray();
        // $query = Student::query();
        // $students = $query->with('user','level', 'grade', 'classroom')->whereIn('classroom_id', $classroomIds)
        //     ->paginate(10)
        //     ->onEachSide(1);
        // return inertia('Teacher/Pages/Dashboard',[
        //     'classroomName' => $classroomName,
        //     'NumberOfStudents' => count($students->pluck('id')),
        //     "students" => IndexStudentResource::collection($students),
        // ]);

    }

    public function guardian()
    {
        return inertia('Student/Guardian/Dashboard');
    }

    public function student()
    {
        return inertia('Student/Dashboard');
    }


}
