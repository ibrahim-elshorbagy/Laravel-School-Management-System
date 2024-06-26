<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use App\Http\Resources\IndexStudentResource;
use App\Models\Answer;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Question;
use App\Models\Student;
use App\Models\Subject;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Exam::query()->with('level','grade','classroom','teacher.user','subject');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

       if (request("name")) {
        $query->whereHas('user', function ($q) {
            $q->where("name", "like", "%" . request("name") . "%");
        });
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


        $subjects = Subject::with('grade', 'level', 'teacher.user','specialization')->get()
        ->map(function ($subject) {
            return [
                'id' => $subject->id,
                'grade_id' => $subject->grade->id,
                'level_id' => $subject->level->id,
                'teacher_id' => $subject->teacher->id,
                'teacher_name' => $subject->teacher->user->name,
                'subject_name' => $subject->specialization->Name,
                'subject_id' => $subject->specialization->id,

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

    $exam = Exam::create([
        'name' => $data['name'],
        'level_id' => $data['level_id'],
        'grade_id' => $data['grade_id'],
        'classroom_id' => $data['classroom_id'],
        'subject_id' => $data['subject_id'],
        'teacher_id' => $data['teacher_id'],
    ]);

    foreach ($data['questions'] as $questionData) {
        $question = Question::create([
            'question' => $questionData['question'],
            'exam_id' => $exam->id,
        ]);

        foreach ($questionData['answers'] as $answerData) {
            Answer::create([
                'answer' => $answerData['text'],
                'correct_answer' => $answerData['isCorrect'],
                'question_id' => $question->id,
            ]);
        }
    }

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

        $subjects = Subject::with('grade', 'level', 'teacher.user','specialization')->get()
        ->map(function ($subject) {
            return [
                'id' => $subject->id,
                'grade_id' => $subject->grade->id,
                'level_id' => $subject->level->id,
                'teacher_id' => $subject->teacher->id,
                'teacher_name' => $subject->teacher->user->name,
                'subject_name' => $subject->specialization->Name,
                'subject_id' => $subject->specialization->id,
            ];
        });

        $exam->load('questions.answers');

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


    //-------------

        $exam->update([
            'name' => $data['name'],
            'level_id' => $data['level_id'],
            'grade_id' => $data['grade_id'],
            'classroom_id' => $data['classroom_id'],
            'subject_id' => $data['subject_id'],
            'teacher_id' => $data['teacher_id'],
        ]);

    //-------------

        $questionIds = [];
        $answerIds = [];

        foreach ($data['questions'] as $questionData) {

            $question = $exam->questions()->firstOrCreate(//comapre the question
                ['question' => $questionData['question']],
                ['exam_id' => $exam->id]
            );
            $questionIds[] = $question->id;

            foreach ($questionData['answers'] as $answerData) {
                $answer = $question->answers()->updateOrCreate(
                    ['answer' => $answerData['text']],
                    ['correct_answer' => $answerData['isCorrect']]
                );
                $answerIds[] = $answer->id;
            }

            // Delete answers not in the request
            $question->answers()->whereNotIn('id', $answerIds)->delete();
            $answerIds = []; // Reset for the next question
        }

        // Delete questions not in the request
        $exam->questions()->whereNotIn('id', $questionIds)->delete();

        return redirect()->route('exam.index')->with('success', 'Exam updated successfully');
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
