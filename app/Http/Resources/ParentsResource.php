<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParentsResource extends JsonResource
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

            'email' => $this->email,
            'password' => $this->password,
            'name_father' => $this->name_father,
            'passport_id_father' => $this->passport_id_father,
            'phone_father' => $this->phone_father,
            'job_father' => $this->job_father,
            'nationality_father_id' => $this->nationality_father_id,
            'address_father' => $this->address_father,

            'name_mother' => $this->name_mother,
            'passport_id_mother' => $this->passport_id_mother,
            'phone_mother' => $this->phone_mother,
            'job_mother' => $this->job_mother,
            'nationality_mother_id' => $this->nationality_mother_id,
            'address_mother' => $this->address_mother,

            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->created_at))->format('Y-m-d'),

        ];
    }
}
