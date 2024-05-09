<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $hidden = [
        'password',
    ];

    protected $visible = [
        'id',
        'name',
        'email',
        'specialization_id',
        'gender',
        'address',
        'created_at',
        'updated_at',
    ];
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function classrooms()
    {
        return $this->belongsToMany(Classroom::class, 'classroom_teachers');

    }

}
