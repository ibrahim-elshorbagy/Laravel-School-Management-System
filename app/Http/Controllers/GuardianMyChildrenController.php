<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExamResource;
use App\Http\Resources\MyChildExamsResource;
use App\Http\Resources\MyChildrenResource;
use App\Models\Exam;
use App\Models\ExamResult;
use App\Models\Student;
use Illuminate\Http\Request;

class GuardianMyChildrenController extends Controller
{
    public function guardian()
    {
        $guardianId = auth()->user()->guardian->id;

        $query = Student::query();
        $MyChildren = $query->with('user','level', 'grade', 'classroom')->where('guardian_id', $guardianId)
            ->paginate(9)
            ->onEachSide(1);
        return inertia('Student/Guardian/Dashboard',[
            "MyChildren" => MyChildrenResource::collection($MyChildren),
        ]);
    }


    public function MyChildren(){
        $guardianId = auth()->user()->guardian->id;

        $query = Student::query();
        $MyChildren = $query->with('user','level', 'grade', 'classroom')->where('guardian_id', $guardianId)
            ->paginate(10)
            ->onEachSide(1);
        return inertia('Student/Guardian/MyChildren/Index',[
            "MyChildren" => MyChildrenResource::collection($MyChildren),
        ]);

    }

 public function showExams($id)
{
    $childExams = ExamResult::query()
        ->where('student_id', $id)
        ->with('exam', 'student');

    $exams = $childExams->paginate(10)->onEachSide(1);

    return inertia("Student/Guardian/MyChildren/degrees", [
        "exams" => MyChildExamsResource::collection($exams),
        'queryParams' => request()->query() ?: null,
        'student_id' => $id,
    ]);
}

}
