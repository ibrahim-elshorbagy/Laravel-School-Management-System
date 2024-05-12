<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    public $timestamps = false;

    use HasFactory;
    protected $guarded = [];

    public function StudentName()
    {
        return $this->belongsTo(Student::class,'student_id');
    }

     public function FromLevel()
    {
        return $this->belongsTo(Level::class,'from_level');
    }
     public function FromGrade()
    {
        return $this->belongsTo(Grade::class,'from_grade');
    }
     public function FromClassroom()
    {
        return $this->belongsTo(Classroom::class,'from_classroom');
    }


        public function ToLevel()
    {
        return $this->belongsTo(Level::class,'to_level');
    }
    public function ToGrade()
    {
        return $this->belongsTo(Grade::class,'to_grade');
    }
    public function ToClassroom()
    {
        return $this->belongsTo(Classroom::class,'to_classroom');
    }

}
