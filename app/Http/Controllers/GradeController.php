<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use App\Http\Resources\GradeResource;
use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use App\Http\Resources\LevelResource;
use App\Models\Level;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $query = Grade::query()->with('level');
        $sortFileds = request('sort_field','id');
        $sortDirection = request('sort_direction','desc');

        if(request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $grades = $query->orderBy($sortFileds,$sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Grade/Index', [
            'grades' => GradeResource::collection($grades),
            'queryParams' => request()->query() ?: null,
            'success'=>session('success')
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia("Grade/Create", [
            'levels' => LevelResource::collection($levels),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGradeRequest $request)
    {
        $data = $request->validated();
        Grade::create($data);
        return to_route('grade.index')
        ->with('success',"Grade created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Grade $grade)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grade $grade)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);

        return inertia('Grade/Edit',[
            'grade'=>new GradeResource($grade),
            'levels' => LevelResource::collection($levels),

        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradeRequest $request, Grade $grade)
    {
        $data = $request->validated();


        $grade ->update($data);
        return to_route('grade.index')
        ->with('success',"Grade Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grade)
    {

        $grade->delete();
        return to_route('grade.index')->with('success','Project deleted successfully');
    }
}
