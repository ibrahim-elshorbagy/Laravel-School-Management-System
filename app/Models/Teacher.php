<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function classrooms()
    {
        return $this->belongsToMany(Classroom::class, 'classroom_teachers');

    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
