<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
     public function user()
    {
        return $this->belongsTo(User::class);
    }


     public function level()
    {
        return $this->belongsTo(Level::class);
    }
     public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
     public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
    public function guardian()
    {
        return $this->belongsTo(Guardian::class);
    }

    public function student_fee()
    {
        return $this->hasMany(StudentFee::class);
    }
    
    public function feeInvoices()
    {
        return $this->hasMany(FeeInvoice::class);
    }


    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}

