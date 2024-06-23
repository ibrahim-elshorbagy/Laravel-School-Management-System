<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Student;
use App\Http\Resources\IndexStudentResource;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::select('id','name')->with('classrooms','classrooms.grade')->get();
        return inertia('Student/StudentAttendance/Index',
            ['levels'=>$levels,
            'success'=>session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::user();
        $teacherId = $user->teacher->id;

        $students = Student::with('user','attendance','level', 'grade', 'classroom')
        ->where('classroom_id', $id)
        ->get()
        ->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->user->name,
                'level' =>  $student->level->name,
                'level_id' =>  $student->level->id,
                'grade' => $student->grade->name,
                'grade_id' => $student->grade->id,
                'classroom' =>$student->classroom->name,
                'classroom_id' =>$student->classroom->id,
            ];
        });

        $today = now()->format('Y-m-d');
        $taken = Attendance::where('classroom_id', $id)->whereDate('attendence_date', $today)->get();

        return inertia('Student/StudentAttendance/Create',
            [
            "students" => $students,
            'taken' => $taken,
            'teacherId' => $teacherId
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {

        $data = $request->validated();
        if(isset($data['students'])){
        foreach ($data['students'] as $student) {
            Attendance::create([
                'student_id' => $student['id'],
                'level_id' => $student['level_id'],
                'grade_id' => $student['grade_id'],
                'classroom_id' => $student['classroom_id'],
                'teacher_id' => $student['teacher_id'],
                'attendence_status' => $student['attendance'],
                'attendence_date' => $student['date'],
            ]);
        }

        return to_route('student-attendances.index')
        ->with('success',"Attendance Taked successfully");
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
