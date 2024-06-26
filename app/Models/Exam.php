<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function grade(){
        return $this->belongsTo(Grade::class);
    }

    public function classroom(){
        return $this->belongsTo(Classroom::class);
    }

    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }

    public function questions(){
        return $this->hasMany(Question::class);
    }

}
