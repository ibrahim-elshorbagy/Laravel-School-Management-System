<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'password',
        'name_father',
        'passport_id_father',
        'phone_father',
        'job_father',
        'national_id_father',
        'address_father',
        'name_mother',
        'passport_id_mother',
        'phone_mother',
        'job_mother',
        'national_id_mother',
        'address_mother',
        'created_at',
        'updated_at'
    ];

}
