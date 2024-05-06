<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use App\Http\Requests\StoreParentsRequest;
use App\Http\Requests\UpdateParentsRequest;
use App\Http\Resources\ParentsResource;

class ParentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Parents::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $parents = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Parents/Index", [
            "parents" => ParentsResource::collection($parents),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParentsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Parents $parents)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Parents $parents)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParentsRequest $request, Parents $parents)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parents $parents)
    {
        //
    }
}
