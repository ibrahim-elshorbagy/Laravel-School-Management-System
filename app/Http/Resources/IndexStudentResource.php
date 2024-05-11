<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class IndexStudentResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'level' => $this->whenLoaded('level', function () {
                return $this->level->name;
            }),
            'grade' => $this->whenLoaded('grade', function () {
                return $this->grade->name;
            }),
            'classroom' => $this->whenLoaded('classroom', function () {
                return $this->classroom->name;
            }),
           
            'academic_year' => $this->academic_year,
        ];
    }
}
