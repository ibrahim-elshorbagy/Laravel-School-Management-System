<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'status',
        'grade_id',
        'level_id',
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class, 'grade_id', 'id');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id', 'id');
    }
    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'classroom_teachers');
    }


}
