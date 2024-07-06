<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function level()
   {
       return $this->belongsTo(Level::class);
   }
    public function grade()
   {
       return $this->belongsTo(Grade::class);
   }
   
   public function feeInvoices()
    {
        return $this->hasMany(FeeInvoice::class);
    }
}
