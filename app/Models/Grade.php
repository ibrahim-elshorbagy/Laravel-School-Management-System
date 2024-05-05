<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level_id'
    ];

    // protected $with =['level'];
    public function level()
    {
        return $this->belongsTo(Level::class,'level_id','id');
    }

}
