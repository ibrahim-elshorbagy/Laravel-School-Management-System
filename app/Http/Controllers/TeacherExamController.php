<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use App\Http\Resources\IndexStudentResource;
use App\Models\Answer;
use App\Models\Classroom;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

class TeacherExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teacher_id = Auth::user()->teacher->id;

        $query = Exam::query()->with('level','grade','classroom','teacher.user','subject')->where('teacher_id', $teacher_id);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");


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
        //teacher -> subjects ->( specialization , grade , level)
        $teacher = Auth::user()->teacher()->with('subjects.specialization','subjects.grade', 'subjects.level')->first()->toArray();;
        $teacher['name']=Auth::user()->name;
        $classrooms = Classroom::orderBy('name','asc')->get(['id','name','grade_id','level_id']);

        return inertia("Teacher/Pages/Exams/Create",
    [
        'teacher' => $teacher,
        'classrooms' => $classrooms,
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

        return to_route('My-exams.index')
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
    public function edit($id)
    {
        $exam = Exam::find($id)->load('questions.answers')->toArray();
        $teacher = Auth::user()->teacher()
            ->with('subjects.specialization', 'subjects.grade', 'subjects.level')
            ->first();

        $teacher->name = Auth::user()->name;

        $classrooms = Classroom::orderBy('name', 'asc')->get(['id', 'name', 'grade_id', 'level_id']);

        return inertia('Teacher/Pages/Exams/Edit', [
            'teacher' => $teacher,
            'classrooms' => $classrooms,
            'exam' => $exam,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request,$id)
    {

        $exam = Exam::find($id)->load('questions.answers');

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

        return redirect()->route('My-exams.index')->with('success', 'Exam updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $exam = Exam::find($id)->load('questions.answers');

        $exam->delete();
        return to_route('My-exams.index')->with('success','Exam deleted successfully');

    }
}
