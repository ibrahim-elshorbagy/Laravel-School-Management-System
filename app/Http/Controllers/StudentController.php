<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Http\Resources\IndexStudentResource;
use Illuminate\Support\Facades\Storage;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Guardian;
use App\Models\Level;
use App\Models\Nationality;
use Illuminate\Support\Str;


class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Student::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }
        $students = $query->with('level', 'grade', 'classroom')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Student/Index", [
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
        $guardians = Guardian::orderBy('name', 'asc')->get(['id', 'name']);

        $nationalities = Nationality::orderBy('name', 'asc')->get(['id', 'name']);



        return inertia("Student/Create",
    [
        'nationalities' => $nationalities,
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'guardians' => $guardians
    ]);

    }

    /**
     * Store a newly created resource in storage.
     */

public function store(StoreStudentRequest $request)
{


    $data = $request->validated();

dd($data);

    // If guardian_id exists, use it directly
    if ($data['guardian_id']) {
        $studentData = [
            'email' => $data['email'],
            'password' => $data['password'],
            'name' => $data['name'],
            'national_id' => $data['national_id'],
            'gender' => $data['gender'],
            'date_birth' => $data['date_birth'],
            'level_id' => $data['level_id'],
            'grade_id' => $data['grade_id'],
            'classroom_id' => $data['classroom_id'],
            'academic_year' => $data['academic_year'],
            'guardian_id' => $data['guardian_id'],
        ];

        $image = $data['image'] ?? null;
        if($image)
        {
            $studentData['image_path'] = $image->store('student/' . Str::random(),'public');
        }

        // Create the student
        Student::create($studentData);

    } else {
        // If guardian_id doesn't exist, create a new guardian and then assign its ID to the student
        $guardianData = [
            'email' => $data['guardian_email'],
            'password' => $data['guardian_password'],
            'name' => $data['guardian_name'],
            'phone' => $data['guardian_phone'],
            'passport_id' => $data['guardian_passport_id'],
            'job' => $data['guardian_job'],
            'national_id' => $data['guardian_national_id'],
            'address' => $data['guardian_address'],
        ];

        // Create the guardian
        $guardian = Guardian::create($guardianData);

        // Now, create the student and assign the guardian's ID to it
        $studentData = [
            'email' => $data['email'],
            'password' => $data['password'],
            'name' => $data['name'],
            'national_id' => $data['national_id'],
            'gender' => $data['gender'],
            'date_birth' => $data['date_birth'],
            'level_id' => $data['level_id'],
            'grade_id' => $data['grade_id'],
            'classroom_id' => $data['classroom_id'],
            'academic_year' => $data['academic_year'],
            'guardian_id' => $guardian->id, // Assign guardian's ID
        ];

        $image = $data['image'] ?? null;
        if($image)
        {
            $studentData['image_path'] = $image->store('student/' . Str::random(),'public');
        }

        // Create the student
        Student::create($studentData);
    }

    return redirect()->route('student.index')
        ->with('success', 'Student Added Successfully');
}


    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        $classrooms = Classroom::orderBy('name','asc')->get(['id','name','grade_id']);
        $guardians = Guardian::orderBy('name', 'asc')->get(['id', 'name']);

        $nationalities = Nationality::orderBy('name', 'asc')->get(['id', 'name']);

        $student = $student->load('level', 'grade', 'classroom','guardian');


        return inertia("Student/Edit",
    [
        'nationalities' => $nationalities,
        'levels' => $levels,
        'grades' => $grades,
        'classrooms' => $classrooms,
        'guardians' => $guardians,
        'student' => new StudentResource($student)

    ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {

        $data = $request->validated();

        $image = $data['image'] ?? null;
        if($image)
        {
            if($student->image_path)
            {
                Storage::disk('public')->deleteDirectory(dirname($student->image_path));
            }
            $data['image_path'] = $image->store('student/' . Str::random(),'public');
        }
        unset($data['image']);



        $student->update($data);

        return redirect()->route('student.index')
            ->with('success', 'Student successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student ->delete();
        if($student->image_path)
            {
                Storage::disk('public')->deleteDirectory(dirname($student->image_path));
            }
        return to_route('student.index')->with('success','Student deleted successfully');

    }
}
