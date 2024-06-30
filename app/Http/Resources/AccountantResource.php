<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountantResource extends JsonResource
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
            'phone' => $this->phone,
            'address' => $this->address,

            'level'=> $this->whenLoaded('level',function(){
                return $this->level->name;
            }),
            
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
