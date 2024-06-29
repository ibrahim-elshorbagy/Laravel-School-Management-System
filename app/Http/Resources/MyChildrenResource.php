<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class MyChildrenResource extends JsonResource
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
            'email' =>  $this->whenLoaded('user', function () {
                return $this->user->email;
            }),
            'level' => $this->whenLoaded('level', function () {
                return $this->level->name;
            }),
            'grade' => $this->whenLoaded('grade', function () {
                return $this->grade->name;
            }),
            'classroom' => $this->whenLoaded('classroom', function () {
                return $this->classroom->name;
            }),
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : $this->image_path,
            'academic_year' => $this->academic_year,
        ];
    }
}
