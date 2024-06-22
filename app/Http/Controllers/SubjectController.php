<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\LevelResource;
use App\Http\Resources\SubjectResource;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Specialization;
use App\Models\Teacher;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Subject::query()->with('level','grade','teacher','specialization');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

    if (request("name")) {
                $query->where("name", "like", "%" . request("name") . "%");
            }

        $subjects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("LearnProcess/Subjects/Index", [
            "subjects" => SubjectResource::collection($subjects),
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
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $teachers = Teacher::with('specialization','level')->get()
        ->map(function ($teacher) {
            return [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'specialization' => $teacher->specialization->Name,
                'specialization_id' => $teacher->specialization_id,
                'level' => $teacher->level->name,
                'level_id' => $teacher->level_id,

            ];
        });
        $specializations = Specialization::orderBy('name', 'asc')->get(['id', 'name']);


        return inertia("LearnProcess/Subjects/Create", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades,
            'teachers' => $teachers,
            'specializations' => $specializations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {
        $data = $request->validated();
        Subject::create($data);
        return to_route('subject.index')
        ->with('success',"Subject created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $specializations = Specialization::orderBy('name', 'asc')->get(['id', 'name']);


        $teachers = Teacher::with('specialization','level')->get() //get all teachers
        ->map(function ($teacher) {
            return [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'specialization' => $teacher->specialization->Name,
                'specialization_id' => $teacher->specialization_id,
                'level' => $teacher->level->name,
                'level_id' => $teacher->level_id,
            ];
        });

        return inertia("LearnProcess/Subjects/Edit", [
            'levels' => LevelResource::collection($levels),
            'grades'=> $grades,
            'teachers' =>$teachers,
            'subject' => $subject,
            'specializations' => $specializations
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $data = $request->validated();
        $subject->update($data);
        return to_route('subject.index')
        ->with('success',"Subject updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
        return to_route('subject.index')->with('success','Subject deleted successfully');

    }
}
