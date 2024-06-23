<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;
use App\Http\Resources\PromotionResource;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Promotion::query();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }


        $promotions = $query->with(['student', 'FromLevel', 'FromGrade', 'FromClassroom', 'ToLevel', 'ToGrade', 'ToClassroom'])
        ->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return inertia("Student/StudentPromotion/Index", [
            "promotions" => PromotionResource::collection($promotions),
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
        $classrooms = Classroom::orderBy('name','asc')->get(['id','name','grade_id']);
        return inertia('Student/StudentPromotion/Promotion',
    [
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'error_promotions'=>session('error_promotions'),
        'success'=>session('success')
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionRequest $request)
    {


        $data = $request->validated();

        $students = Student::where('level_id', $data['old_level_id'])
            ->where('grade_id', $data['old_grade_id'])
            ->where('classroom_id', $data['old_classroom_id'])
            ->get(['id', 'level_id', 'grade_id', 'classroom_id', 'academic_year']);

            if($students->count() < 1){
                return redirect()->back()->with('error_promotions','No students found to promote');
            }

            foreach ($students as $student){
                $ids = explode(',',$student->id);
                student::whereIn('id', $ids)
                    ->update([
                        'level_id'=>$data['level_id'],
                        'grade_id'=>$data['grade_id'],
                        'classroom_id'=>$data['classroom_id'],
                        'academic_year'=>$data['academic_year'],
                    ]);

                Promotion::updateOrCreate([
                    'student_id'=>$student['id'],
                    'from_level'=>$data['old_level_id'],
                    'from_grade'=>$data['old_grade_id'],
                    'from_classroom'=>$data['old_classroom_id'],
                    'academic_year'=>$data['old_academic_year'],
                    'to_level'=>$data['level_id'],
                    'to_grade'=>$data['grade_id'],
                    'to_classroom'=>$data['classroom_id'],
                    'academic_year_new'=>$data['academic_year'],

                ]);
            }



                return redirect()->route('promotion.index')->with('success', 'Students Promoted successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionRequest $request, Promotion $promotion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {


                $promotion = Promotion::findorfail($promotion->id);

                student::where('id', $promotion->student_id)
                    ->update([
                        'level_id'=>$promotion->from_level,
                        'grade_id'=> $promotion->from_grade,
                        'classroom_id'=>$promotion->from_classroom,
                        'academic_year'=>$promotion->academic_year,
                    ]);


                Promotion::destroy($promotion->id);
                return to_route('promotion.index')->with('success','Promotion Removed successfully');

    }
}
