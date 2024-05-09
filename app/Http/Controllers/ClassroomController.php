<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\TeacherResource;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Teacher;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::select('id','name')->with('classrooms','classrooms.grade')->get();
        return inertia('Classroom/Index',
            ['levels'=>$levels,
            'success'=>session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $teachers = Teacher::with('specialization')->orderBy('name','asc')->get(['id','name']);
        return inertia("Classroom/Create", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades,
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {

        $data = $request->validated();

        $classroom = Classroom::create($data);
        $classroom->teachers()->attach($data['teacher_id']);
        return to_route('classroom.index')
        ->with('success',"Classroom created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Classroom $classroom)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $teachers = $classroom->teachers()->select('id','name')->get();
        dd($teachers);

        return inertia("Classroom/Edit", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades,
            'classroom'=> $classroom,
            'teachers' => $teachers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        $data = $request->validated();
        $classroom->update($data);
        $classroom->teachers()->attach($data['teacher_id']);
        return to_route('classroom.index')
        ->with('success',"Classroom created successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();
        return to_route('classroom.index')->with('success','Classroom deleted successfully');
    }
}
