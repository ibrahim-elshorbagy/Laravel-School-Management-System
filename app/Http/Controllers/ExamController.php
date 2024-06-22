<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use App\Http\Resources\IndexStudentResource;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Student;
use App\Models\Subject;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Exam::query()->with('level','grade','classroom','teacher','subject');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $exams = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("LearnProcess/Exams/Index", [
            "exams" => ExamResource::collection($exams),
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
        $classrooms = Classroom::orderBy('name','asc')->get(['id','name','grade_id','level_id']);


        $subjects = Subject::with('grade', 'level', 'teacher','specialization')->get()
        ->map(function ($subject) {
            return [
                'id' => $subject->id,
                'grade_id' => $subject->grade->id,
                'level_id' => $subject->level->id,
                'teacher_id' => $subject->teacher->id,
                'teacher_name' => $subject->teacher->name,
                'subject_name' => $subject->specialization->Name,
                'subject_id' => $subject->specialization->id,
                // 'teacher_specialization' => $subject->teacher->specialization->name, does not working ,'teacher.specialization',

            ];
        });

        return inertia("LearnProcess/Exams/Create",
    [
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'subjects' => $subjects,
    ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {

        $data = $request->validated();

        Exam::create($data);

        return to_route('exam.index')
            ->with('success', 'Exam Added Successfully ');

    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $classrooms = Classroom::orderBy('name','asc')->get(['id','name','grade_id','level_id']);

        $subjects = Subject::with('grade', 'level', 'teacher','specialization')->get()
        ->map(function ($subject) {
            return [
                'id' => $subject->id,
                'grade_id' => $subject->grade->id,
                'level_id' => $subject->level->id,
                'teacher_id' => $subject->teacher->id,
                'teacher_name' => $subject->teacher->name,
                'subject_name' => $subject->specialization->Name,
                'subject_id' => $subject->specialization->id,
                // 'teacher_specialization' => $subject->teacher->specialization->name, does not working ,'teacher.specialization',

            ];
        });

        return inertia("LearnProcess/Exams/Edit",
    [
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'subjects' => $subjects,
        'exam' => $exam,
    ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $data = $request->validated();
        $exam->update($data);
        return to_route('exam.index')
        ->with('success',"Eexam updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return to_route('exam.index')->with('success','Exam deleted successfully');

    }
}
