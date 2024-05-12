<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePromotionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'old_level_id' => ['required', 'numeric'],
            'old_grade_id' => ['required', 'numeric'],
            'old_classroom_id' => ['required', 'numeric'],
            'old_academic_year' => ['required', 'numeric'],
            'level_id' => ['required', 'numeric'],
            'grade_id' => ['required', 'numeric'],
            'classroom_id' => ['required', 'numeric'],
            'academic_year' => ['required', 'numeric'],

        ];
    }
}
