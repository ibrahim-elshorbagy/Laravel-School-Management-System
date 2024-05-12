<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PromotionResource extends JsonResource
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
            'StudentName' => $this->whenLoaded('StudentName', function () {
                return $this->StudentName->name;
            }),
            'FromLevel' => $this->whenLoaded('FromLevel', function () {
                return $this->FromLevel->name;
            }),
            'FromGrade' => $this->whenLoaded('FromGrade', function () {
                return $this->FromGrade->name;
            }),
            'FromClassroom' => $this->whenLoaded('FromClassroom', function () {
                return $this->FromClassroom->name;
            }),

            'ToLevel'  => $this->whenLoaded('ToLevel', function () {
                return $this->ToLevel->name;
            }),
            'ToGrade'  => $this->whenLoaded('ToGrade', function () {
                return $this->ToGrade->name;
            }),
            'ToClassroom'   => $this->whenLoaded('ToClassroom', function () {
                return $this->ToClassroom->name;
            }),
        ];

    }
}
