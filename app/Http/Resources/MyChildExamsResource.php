<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyChildExamsResource extends JsonResource
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
            'exam_name' => $this->whenLoaded('exam', function () {
                return $this->exam->name;
            }),
            'level' => $this->whenLoaded('exam', function () {
                return $this->exam->level->name;
            }),

            'grade' => $this->whenLoaded('exam', function () {
                return $this->exam->grade->name;
            }),
            'classroom' => $this->whenLoaded('exam', function () {
                return $this->exam->classroom->name;
            }),
            'examResult' => $this->degree,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),


        ];
    }
}
