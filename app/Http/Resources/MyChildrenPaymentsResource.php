<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class MyChildrenPaymentsResource extends JsonResource
{

    public static $wrap = false;


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
                return [
            'id' => $this->id,
            'name' => $this->whenLoaded('user', function () {
                return $this->user->name;
            }),
            'academic_year' => $this->academic_year,
            'studentFees' => StudentFeeResource::collection($this->whenLoaded('student_fee')),
            'feeInvoices' => FeeInvoiceResource::collection($this->whenLoaded('feeInvoices')),
            'academic_year' => $this->academic_year,
        ];
    }
}
