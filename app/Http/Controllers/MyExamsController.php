<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResource;
use App\Models\Exam;
use App\Models\ExamResult;
use Illuminate\Http\Request;

class MyExamsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userClassroom_id = auth()->user()->student->classroom_id;
        $query = Exam::query()->where('classroom_id', $userClassroom_id)->with('level','grade','examResult');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $exams = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Student/MyExams/Index", [
            "exams" => ExamResource::collection($exams),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'danger' => session('danger'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

 public function show($id)
{
    $studentId = auth()->user()->student->id;

    $examResult = ExamResult::where('student_id', $studentId)
                            ->where('exam_id', $id)
                            ->first();

    if ($examResult) {
        return redirect()->route('MyExam.index')->with(['danger', "Exam already attended."]);
    }

    $exam = Exam::with(['questions.answers' => function($q) {
                    $q->select('id', 'question_id', 'answer');
                }])
                ->findOrFail($id)
                ->toArray();

    return Inertia('Student/MyExams/AttendExam', [
        'exam' => $exam,
    ]);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
                'exam_id' => 'required|exists:exams,id',
                'answers' => 'required|array',
                'answers.*' => 'required|exists:answers,id',
            ]);

        $examId = $validatedData['exam_id'];
        $exam = Exam::select('id')
        ->with([
            'questions' => function ($q) {
                $q->select('id', 'question', 'exam_id');
            },
            'questions.answers' => function ($q) {
                $q->select('id', 'question_id', 'answer', 'correct_answer');
            }
        ])
        ->findOrFail($examId)
        ->toArray();


    $degree = 0;

    $userAnswers = $validatedData['answers'];

    foreach ($exam['questions'] as $question) {
        $questionId = $question['id'];

        if (isset($userAnswers[$questionId])) {
            $userAnswerId = $userAnswers[$questionId];

            foreach ($question['answers'] as $answer) {
                if ($answer['id'] == $userAnswerId && $answer['correct_answer'] == 1) {
                    $degree++;
                    break;
                }
            }
        }
    }

    $data = [
        'student_id'=>auth()->user()->student->id,
        'degree' => $degree,
        'exam_id' => $validatedData['exam_id'],
    ];

    ExamResult::create($data);
    return to_route('MyExam.index')->with('success',"Exam attended successfully");
}




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
