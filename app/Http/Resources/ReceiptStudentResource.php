<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceiptStudentResource extends JsonResource
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
                return $this->student->user->name;
            }),
            'student_id' => $this->whenLoaded('student', function () {
                return $this->student->id;
            }),
            'debit' => $this->debit,
            'description' => $this->description,
            'created_at' =>  (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' =>  (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
