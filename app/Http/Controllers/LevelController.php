<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Http\Requests\StoreLevelRequest;
use App\Http\Requests\UpdateLevelRequest;
use App\Http\Resources\LevelResource;
use App\Models\Grade;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Level::query();
        $sortFileds = request('sort_field','id') ;
        $sortDirection = request('sort_direction','asc');

        if(request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }


        $levels = $query->orderBy($sortFileds,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia('Level/Index', [
            'levels' => LevelResource::collection($levels),
            'queryParams' => request()->query() ?: null,
            'success'=>session('success'),
            'danger'=>session('danger'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Level/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLevelRequest $request)
    {
        $data = $request->validated();
        Level::create($data);
        return to_route('level.index')
        ->with('success',"Level created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Level $level)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Level $level)
    {
        return inertia('Level/Edit',[
            'level'=>new LevelResource($level)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLevelRequest $request, Level $level)
    {
        $data = $request->validated();


        $level ->update($data);
        return to_route('level.index')
        ->with('success',"Grade Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $level)
    {

        $gradesCount = Grade::where('level_id',$level->id)->count();
        if(!$gradesCount){
            $level->delete();
            return to_route('level.index')->with('success','Level deleted successfully');
        }
        return to_route('level.index')->with('danger','This Level Has Grades');
    }
}
