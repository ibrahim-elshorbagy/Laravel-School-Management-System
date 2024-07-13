<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use App\Http\Requests\StoreFeeRequest;
use App\Http\Requests\UpdateFeeRequest;
use App\Http\Resources\FeeResource;
use App\Models\Grade;
use App\Models\Level;

class FeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Fee::query()->with('level','grade');
        $sortFileds = request('sort_field','id');
        $sortDirection = request('sort_direction','desc');

        if(request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $fees = $query->orderBy($sortFileds,$sortDirection)->paginate(10)->onEachSide(1);

        return inertia('FeesSystem/Fee/Index', [
            'fees' => FeeResource::collection($fees),
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
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        return inertia('FeesSystem/Fee/Create',
                [
                    'levels' => $levels,
                    'grades' => $grades,
                ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeeRequest $request)
    {
        $data = $request->validated();

        if($data['type'] === 'public')
        {
            $data['level_id'] = null;
            $data['grade_id'] = null;
            // $data['year'] = null;
        }
        Fee::create($data);
        return to_route('fee.index')
        ->with('success',"Fee created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Fee $fee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fee $fee)
    {
        $levels = Level::orderBy('name', 'asc')->get(['id', 'name']);
        $grades = Grade::orderBy('name','asc')->get(['id','name','level_id']);
        return inertia('FeesSystem/Fee/Edit',[
            'fee'=> $fee,
            'levels' => $levels,
            'grades' => $grades,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeeRequest $request, Fee $fee)
    {
        $data = $request->validated();

        if($data['type'] === 'public')
        {
            $data['level_id'] = null;
            $data['grade_id'] = null;
        }

        $fee ->update($data);
        return to_route('fee.index')
        ->with('success',"Fee Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fee $fee)
    {
        $fee->delete();
        return to_route('fee.index')->with('success','Fee deleted successfully');

    }
}
