<?php

namespace App\Http\Controllers;

use App\Models\FeeInvoice;
use App\Http\Requests\StoreFeeInvoiceRequest;
use App\Http\Requests\UpdateFeeInvoiceRequest;
use App\Http\Resources\FeeInvoiceResource;
use App\Http\Resources\IndexStudentResource;
use App\Models\Fee;
use App\Models\Student;
use App\Models\StudentFee;
use Illuminate\Support\Facades\DB;

class FeeInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = FeeInvoice::query()->with('level', 'grade', 'student', 'fee');

        $sortFileds = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->whereHas('student', function ($q) {
                $q->where('name', 'like', '%' . request('name') . '%');
            });
        }

        $feeInvoices = $query->orderBy($sortFileds, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('FeesSystem/FeeInvoice/Index', [
            'feeInvoices' => FeeInvoiceResource::collection($feeInvoices),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
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

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student = Student::select('id','name','level_id','grade_id','classroom_id','academic_year')->findOrFail($id);

        $fees = Fee::select('id','name', 'amount','level_id','grade_id', 'type',)
                ->where('grade_id', $student->grade_id)
                ->orWhere('type', 'public')
                ->get();
        return inertia('FeesSystem/FeeInvoice/Add',compact('student','fees'));
    }

    public function store(StoreFeeInvoiceRequest $request)
    {
        $data=$request->validated();
        $feeInvoice = [
            'student_id'=>$data['student_id'],
            'level_id'=>$data['level_id'],
            'grade_id'=>$data['grade_id'],
            'fee_id'=>$data['fee_id'],
            'amount'=>$data['amount'],
            'description'=>$data['description'] ?? null,
            'type'=>$data['type'],
        ];

        $invoice = FeeInvoice::create($feeInvoice);

        $studentFee = [
            'student_id'=>$data['student_id'],
            'debit'=>$data['amount'],
            'credit'=>0,
            'fee_invoice_id'=>$invoice->id,
            'type'=>'Invoice',
        ];

        StudentFee::create($studentFee);
        return to_route('fee-invoice.index')
        ->with('success',"Fee Invoice created successfully");

    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $feeInvoice = FeeInvoice::with([
            'student' => function ($query) {$query->select('id', 'name');},
            'fee'
            ])->findOrFail($id);
                $fees = Fee::select('id','name', 'amount','level_id','grade_id', 'type',)
                ->where('grade_id', $feeInvoice->grade_id)
                ->orWhere('type', 'public')
                ->get();
        return inertia('FeesSystem/FeeInvoice/Edit',compact('feeInvoice','fees'));

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeeInvoiceRequest $request, FeeInvoice $feeInvoice)
    {

        $data = $request->validated();

        $feeInvoiceData = [
            'fee_id'=>$data['fee_id'],
            'amount'=>$data['amount'],
            'description'=>$data['description'] ?? null,
            'type'=>$data['type'],
        ];

        $feeInvoice ->update($feeInvoiceData);

        $studentFee = StudentFee::where('fee_invoice_id', $feeInvoice->id)->first();
        $studentFee->update([
            'debit' => $data['amount'],
            'credit' => 0,
        ]);

        return to_route('fee-invoice.index')
        ->with('success',"Invoice Updated Successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeeInvoice $feeInvoice)
    {
        $feeInvoice->delete();
        return to_route('fee-invoice.index')->with('success','Fee Invoice deleted successfully');

    }
}
