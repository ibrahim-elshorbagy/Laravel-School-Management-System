<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceiptStudentRequest;
use App\Http\Requests\UpdateReceiptStudentRequest;
use App\Http\Resources\ReceiptStudentResource;
use App\Models\ReceiptStudent;


use App\Models\FundAccount;
use App\Models\Student;
use App\Models\StudentFee;
class ReceiptStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = ReceiptStudent::query();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");


        if (request('name')) {
            $query->whereHas('student', function ($q) {
                $q->where('name', 'like', '%' . request('name') . '%');
            });
        }

        $receipt_students = $query->with('student')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("FeesSystem/Receipt/Index", [
            'receipt_students' => ReceiptStudentResource::collection($receipt_students),
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

        public function show( $id)
    {
        $student = Student::select('id','name')->where('id',$id)->first();
        return inertia('FeesSystem/Receipt/Add',
        [
            'student' =>$student
        ]);

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceiptStudentRequest $request)
    {
        $data = $request->validated();


        $ReceiptStudent= ReceiptStudent::create($data);



        $FundAccountData=[
            'receipt_id'=>$ReceiptStudent->id,
            'debit'=>$data['debit'],
            'description'=>$data['description'],
        ];
        FundAccount::create($FundAccountData);


        $StudentFee=[
            'receipt_id'=>$ReceiptStudent->id,
            'student_id'=>$data['student_id'],
            'credit'=>$data['debit'],
            'debit'=>0,
            'type'=>'Receipt',
        ];
        StudentFee::create($StudentFee);

            return to_route('receipt-student.index')
        ->with('success',"Added successfully");

    }

    /**
     * Display the specified resource.
     */


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReceiptStudent $receiptStudent)
    {
        $receiptStudent->load('student');
        return inertia('FeesSystem/Receipt/Edit',[
            'receipt_student'=>new ReceiptStudentResource($receiptStudent)
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceiptStudentRequest $request, ReceiptStudent $receiptStudent)
    {
        $data = $request->validated();


        $receiptStudent->update($data);

        $FundAccount = FundAccount::where('receipt_id', $receiptStudent->id)->first();

        $FundAccountData=[
            'receipt_id'=>$receiptStudent->id,
            'debit'=>$data['debit'],
            'description'=>$data['description'],
        ];
        $FundAccount->update($FundAccountData);


        $StudentFee = StudentFee::where('receipt_id', $receiptStudent->id)->first();
        $StudentFeeData=[
            'receipt_id'=>$receiptStudent->id,
            'student_id'=>$data['student_id'],
            'credit'=>$data['debit'],
            'debit'=>0,
            'type'=>'Receipt',
        ];
        $StudentFee->update($StudentFeeData);

            return to_route('receipt-student.index')
        ->with('success',"Updated successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReceiptStudent $receiptStudent)
    {
        $receiptStudent->delete();
        return to_route('receipt-student.index')->with('success','Fee Invoice deleted successfully');

    }
}
