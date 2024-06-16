<?php

namespace App\Http\Controllers;

use App\Models\ProcessingFee;
use App\Http\Requests\StoreProcessingFeeRequest;
use App\Http\Requests\UpdateProcessingFeeRequest;
use App\Http\Resources\ProcessingFeeResource;
use App\Models\Student;
use App\Models\StudentFee;

class ProcessingFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = ProcessingFee::query();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request('name')) {
            $query->whereHas('student', function ($q) {
                $q->where('name', 'like', '%' . request('name') . '%');
            });
        }

        $processing_fees = $query->with('student')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("FeesSystem/ProcessingFees/Index", [
            'processing_fees' => ProcessingFeeResource::collection($processing_fees),
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
     * Display the specified resource.
     */
    public function show($id)
    {
        //this part for
        //now if the student want to leave the school
        //so we calc the totalBalance to see the amount of money he won't pay

        $student = Student::with('student_fee')->select('id','name')->where('id',$id)->first();
        $data = json_decode($student, true);

        $totalDebit = 0;
        $totalCredit = 0;

        foreach ($data['student_fee'] as $fee) {
            $totalDebit += (float) $fee['debit'];
            $totalCredit += (float) $fee['credit'];
        }

        $totalBalance = $totalDebit - $totalCredit;
        return inertia('FeesSystem/ProcessingFees/Add',
        [
            'student' =>$student,
            'totalBalance'=>$totalBalance
        ]);

    }

        /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcessingFeeRequest $request)
    {

        $data = $request->validated();

        $ProcessingFee= ProcessingFee::create($data);

        $StudentFee=[
            'processing_id'=>$ProcessingFee->id,
            'student_id'=>$data['student_id'],
            'credit'=>$data['amount'],
            'debit'=>0,
            'type'=>'ProcessingFee',
        ];
        StudentFee::create($StudentFee);


        return to_route('processing-fee.index')
        ->with('success',"Excluded successfully");

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProcessingFee $processingFee)
    {
        $processingFee->load('student');
        return inertia('FeesSystem/ProcessingFees/Edit',[
            'processing_fees'=>new ProcessingFeeResource($processingFee)
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProcessingFeeRequest $request, ProcessingFee $processingFee)
    {
        $data = $request->validated();


        $processingFee->update($data);

        $StudentFee = StudentFee::where('processing_id', $processingFee->id)->first();

            $StudentFeeData=[
            'processing_id'=>$processingFee->id,
            'student_id'=>$data['student_id'],
            'credit'=>$data['amount'],
            'debit'=>0,
            'type'=>'ProcessingFee',
        ];

        $StudentFee->update($StudentFeeData);


        return to_route('processing-fee.index')
        ->with('success',"Edited successfully");

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProcessingFee $processingFee)
    {
        $processingFee->delete();
        return to_route('processing-fee.index')->with('success','Excludeing Processing deleted successfully');

    }
}
