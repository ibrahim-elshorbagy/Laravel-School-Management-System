<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
{
    public static $wrap = false;

    protected $hidden = [
        'password',
    ];

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return ([
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'specialization_id' => $this->specialization_id,
            'specialization' => $this->whenLoaded('specialization', function () {
                return $this->specialization->Name;
            }),
            'gender' => $this->gender,
            'address' => $this->address,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ]);
    }
}
