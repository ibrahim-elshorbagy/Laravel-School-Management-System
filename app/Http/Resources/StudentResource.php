<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentResource extends JsonResource
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
            'password' => $this->password,
            'email' => $this->email,
            'gender' => $this->gender,
            'national_id' => $this->national_id,
            'date_birth' => $this->date_birth,
            'level_id' => $this->whenLoaded('level', function () {
                return $this->level->id;
            }),
            'grade_id' => $this->whenLoaded('grade', function () {
                return $this->grade->id;
            }),
            'classroom_id' => $this->whenLoaded('classroom', function () {
                return $this->classroom->id;
            }),
            'guardian_id' => $this->whenLoaded('guardian', function () {
                return $this->guardian->id;
            }),
            'academic_year' => $this->academic_year,
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : $this->image_path,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
