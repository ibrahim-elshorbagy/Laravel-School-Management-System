<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProcessingFeeResource extends JsonResource
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
            'student' => $this->whenLoaded('student', function () {
                return $this->student->name;
            }),
            'student_id' => $this->whenLoaded('student', function () {
                return $this->student->id;
            }),
            'amount' => $this->amount,
            'description' => $this->description,
            'created_at' =>  (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' =>  (new Carbon($this->updated_at))->format('Y-m-d'),
        ];    }
}
