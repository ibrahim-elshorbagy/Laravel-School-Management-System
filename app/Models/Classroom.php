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




}
