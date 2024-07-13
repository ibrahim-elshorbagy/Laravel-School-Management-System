<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeInvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fee' => $this->whenLoaded('fee', function () {
                return $this->fee->name;
            }),
            'level' => $this->whenLoaded('level', function () {
                return $this->level->name;
            }),
            'grade' => $this->whenLoaded('grade', function () {
                return $this->grade->name;
            }),
            'student' => $this->whenLoaded('student', function () {
                return $this->student->user->name;
           }),
            'amount' => $this->amount,
            'description' => $this->description,
            'type' => $this->type,

            // 'created_at' => $this->created_at,
            'updated_at' =>  (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
