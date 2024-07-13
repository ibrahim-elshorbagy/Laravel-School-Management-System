<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFee extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function feeInvoice()
    {
        return $this->belongsTo(FeeInvoice::class);
    }

    public function processingFee()
    {
        return $this->belongsTo(ProcessingFee::class);
    }

    public function receipt()
    {
        return $this->belongsTo(ReceiptStudent::class);
    }
}
