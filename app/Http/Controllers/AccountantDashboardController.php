<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndexStudentResource;
use App\Models\Student;
use Illuminate\Http\Request;

class AccountantDashboardController extends Controller
{
    public function accountant()
    {
        return inertia('Accountant/Pages/Dashboard');
    }

    public function students(){
        $query = Student::query();

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

        $AcountantLevelId = auth()->user()->accountant->level->id;

        $students = $query->with('user','level', 'grade', 'classroom')
            ->where('level_id', $AcountantLevelId)
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Student/Index", [
            "students" => IndexStudentResource::collection($students),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
