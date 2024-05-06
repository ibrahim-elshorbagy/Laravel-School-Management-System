<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\LevelResource;
use App\Models\Grade;
use App\Models\Level;

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

        return inertia("Classroom/Create", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {
        $data = $request->validated();
        Classroom::create($data);
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

        return inertia("Classroom/Edit", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades,
            'classroom'=> $classroom
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        $data = $request->validated();
        $classroom->update($data);
        return to_route('classroom.index')
        ->with('success',"Classroom created successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();
        return to_route('classroom.index')->with('success','Project deleted successfully');

    }
}
