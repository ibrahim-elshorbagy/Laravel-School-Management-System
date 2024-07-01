<?php

namespace App\Http\Controllers;

use App\Models\StudentServicesManager;
use App\Http\Requests\StoreStudentServicesManagerRequest;
use App\Http\Requests\UpdateStudentServicesManagerRequest;
use App\Http\Resources\StudentServicesManagerResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StudentServicesManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = StudentServicesManager::query();
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

        $StudentServicesManagers = $query->with('user')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("StudentServicesManager/Index", [
            "StudentServicesManagers" => StudentServicesManagerResource::collection($StudentServicesManagers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("StudentServicesManager/Create", [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentServicesManagerRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'StudentServicesManager',

        ]);

        unset($data['name']);
        unset($data['password']);
        unset($data['email']);
        $data['user_id'] = $user->id;

        StudentServicesManager::create($data);

        return to_route('student-services-managers.index')
            ->with('success', 'Student Services Manager Added Successfully ');

    }

    /**
     * Display the specified resource.
     */
    public function show(StudentServicesManager $studentServicesManager)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentServicesManager $studentServicesManager)
    {

        return inertia('StudentServicesManager/Edit',[
            'StudentServicesManager'=>$studentServicesManager->load('user')
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentServicesManagerRequest $request, StudentServicesManager $studentServicesManager)
    {
            {
        $data = $request->validated();

        $user = $studentServicesManager->user;

        $userUpdateData = [
        'name' => $data['name'],
        'email' => $data['email'],
        'role' => 'StudentServicesManager',
        ];

        if (!empty($data['password'])) {
            $userUpdateData['password'] = Hash::make($data['password']);
        }

        $user->update($userUpdateData);

        unset($data['name']);
        unset($data['email']);
        unset($data['password']);

        $data['user_id'] = $user->id;

        $studentServicesManager->update($data);

        return redirect()->route('student-services-managers.index')
            ->with('success', 'Student Services Manager successfully updated');
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentServicesManager $studentServicesManager)
    {
        $studentServicesManager->user->delete();
        return to_route('student-services-managers.index')->with('success','Student Services Manager deleted successfully');

    }
}
