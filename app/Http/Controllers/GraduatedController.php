<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreGraduatedRequest;
use App\Http\Resources\IndexStudentResource;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;

class GraduatedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Student::query()->onlyTrashed();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

       if (request("name")) {
        $query->whereHas('user', function ($q) {
            $q->where("name", "like", "%" . request("name") . "%");
        });
        }
        if (request("email")) {
            $query->whereHas('user', function ($q) {
                $q->where("email", "like", "%" . request("email") . "%");
            });
        }
        $students = $query->with('user','level', 'grade', 'classroom')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Student/GraduatedStudent/Index", [
            "students" => IndexStudentResource::collection($students),
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
        return inertia('Student/GraduatedStudent/Graduation',
    [
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'error_graduations'=>session('error_graduations'),
        'success'=>session('success'),
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGraduatedRequest $request)
    {

        $data = $request->validated();


        $students = student::where('level_id',$data['level_id'])->where('grade_id',$data['grade_id'])->where('classroom_id',$data['classroom_id'])->get('id');

        if($students->count() < 1){
            return redirect()->back()->with('error_graduations', "No Students Found");
        }


        foreach ($students as $student){
            $ids = explode(',',$student->id);
            student::whereIn('id', $ids)->Delete();
        }
        return to_route('graduated.index')
            ->with('success', 'Graduated Successfully ');


    }


    public function edit($id)
    {

        student::onlyTrashed()->where('id', $id)->first()->restore();
        return to_route('graduated.index')
            ->with('success', 'Returned Successfully');
    }


    public function destroy( $id)
    {

        student::onlyTrashed()->where('id', $id)->first()->forceDelete();
        return to_route('graduated.index')
            ->with('success', 'Deleted Successfully');
    }
}
