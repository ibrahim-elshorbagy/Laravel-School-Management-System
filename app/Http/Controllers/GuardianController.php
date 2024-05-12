<?php

namespace App\Http\Controllers;

use App\Models\Guardian;
use App\Http\Requests\StoreGuardianRequest;
use App\Http\Requests\UpdateGuardianRequest;
use App\Http\Resources\GuardianResource;
use App\Models\Nationality;

class GuardianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Guardian::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }
        $guardians = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Guardian/Index", [
            "guardians" => GuardianResource::collection($guardians),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $nationalities = Nationality::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia("Guardian/Create", [
            'nationalities' => $nationalities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuardianRequest $request)
    {

        $data = $request->validated();

        Guardian::create($data);

        return to_route('guardian.index')
            ->with('success', 'Guardian Added Successfully ');
    }

    /**
     * Display the specified resource.
     */
    public function show(Guardian $guardian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guardian $guardian)
    {
        $nationalities = Nationality::orderBy('name', 'asc')->get(['id', 'name']);
        return inertia('Guardian/Edit',[
            'nationalities' => $nationalities,
            'guardian'=>$guardian
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuardianRequest $request, Guardian $guardian)
    {
        $data = $request->validated();

        $guardian->update($data);

        return redirect()->route('guardian.index')
            ->with('success', 'Guardian successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guardian $guardian)
    {
        $guardian ->delete();
        return to_route('guardian.index')->with('success','Guardian deleted successfully');
    }
}
