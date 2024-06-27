<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        return inertia('Dashboard');
    }

    public function teacher()
    {
        return inertia('Teacher/Dashboard');
    }

    public function guardian()
    {
        return inertia('Student/Guardian/Dashboard');
    }

    public function student()
    {
        return inertia('Student/Dashboard');
    }


}
