<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'notes'];
    protected $table = 'levels';
    public $timestamps = true;

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    protected $with =['classrooms'];
    public function classrooms()
    {
        return $this->hasMany(Classroom::class,'level_id');
    }

}
