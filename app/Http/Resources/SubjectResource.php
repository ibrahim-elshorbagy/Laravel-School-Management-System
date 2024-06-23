<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return ([
            'id' => $this->id,
            'level' => $this->whenLoaded('level', function () {
                return $this->level->name;
            }),
            'grade' => $this->whenLoaded('grade', function () {
                return $this->grade->name;
            }),
            'teacher'=>$this->whenLoaded('teacher',function(){
                return $this->teacher->user->name;
            }),
            'specialization' => $this->whenLoaded('specialization', function () {
                return $this->specialization->Name;
            }),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ]);
    }
}
