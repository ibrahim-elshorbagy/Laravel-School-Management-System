<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use App\Http\Requests\StoreParentsRequest;
use App\Http\Requests\UpdateParentsRequest;
use App\Http\Resources\NationalityResource;
use App\Http\Resources\ParentsResource;
use App\Models\nationality;

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
            $query->where("name_father", "like", "%" . request("name") . "%")->orWhere("name_mother", "like", "%" . request("name") . "%");
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

        $nationalities = nationality::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia("Parents/Create", [
            'nationalities' => $nationalities

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParentsRequest $request)
    {

        $data = $request->validated();

        Parents::create($data);

        return to_route('parents.index')
            ->with('success', 'Parents Successfully added');
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
    public function edit(Parents $parent)
    {
        $nationalities = nationality::orderBy('name', 'asc')->get(['id', 'name']);
        return inertia('Parents/Edit',[
            'nationalities' => $nationalities,
            'parents'=>$parent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParentsRequest $request, Parents $parent)
    {
        $data = $request->validated();

        $parent->update($data);

        return redirect()->route('parents.index')
            ->with('success', 'Parent successfully updated');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parents $parent)
    {
        $parent ->delete();
        return to_route('parents.index')->with('success','Parents deleted successfully');

    }
}
