<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuardianResource extends JsonResource
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
            'email' => $this->whenLoaded('user', function () {
                    return $this->user->email;
            }),
            'name' => $this->whenLoaded('user', function () {
                    return $this->user->name;
            }),
            'address' => $this->address,
            'phone' => $this->phone,
            'job' => $this->job,
            'passport_id' => $this->passport_id,
            'national_id' => $this->national_id,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
