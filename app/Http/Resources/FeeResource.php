<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeResource extends JsonResource
{
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
            'amount' => $this->amount,
            'level' => $this->whenLoaded('level', function () {
                return $this->level->name;
            }),
            'grade' => $this->whenLoaded('grade', function () {
                return $this->grade->name;
            }),
            'year' => $this->year,
            // 'type'=>$this->type,
            // 'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
