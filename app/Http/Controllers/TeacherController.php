<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Models\Level;
use App\Models\Specialization;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Teacher::query()->with('specialization','level');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }
        $teachers = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Teacher/Index", [
            "teachers" => TeacherResource::collection($teachers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $specializations = Specialization::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia("Teacher/Create", [
            'specializations' => $specializations,
            'levels' => $levels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $data = $request->validated();
        Teacher::create($data);

        return to_route('teacher.index')
            ->with('success', 'Teacher Added Successfully ');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);

        $specializations = Specialization::orderBy('name', 'asc')->get(['id', 'name']);
        return inertia('Teacher/Edit',[
            'specializations' => $specializations,
            'teacher'=>$teacher,
            'levels' => $levels

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $data = $request->validated();

        $teacher->update($data);

        return redirect()->route('teacher.index')
            ->with('success', 'Teacher successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher ->delete();
        return to_route('teacher.index')->with('success','Teacher deleted successfully');

    }
}
