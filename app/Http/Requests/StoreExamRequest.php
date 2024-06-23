<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamRequest extends FormRequest
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
                'level_id' => ['required', 'numeric'],
                'grade_id' => ['required', 'numeric'],
                'teacher_id' => ['required', 'numeric'],
                'subject_id' => ['required', 'numeric'],
                'classroom_id' => ['required', 'numeric'],
                'name' => ['required', 'string'],

        ];
    }
}