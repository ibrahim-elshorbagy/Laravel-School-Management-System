<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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

            'email' => ['required', 'string', 'unique:students,email'],
            'password' => ['required', 'string'],
            'name' => ['required', 'string'],
            'national_id' => ['nullable', 'numeric'],
            'gender' => ['required', 'string'],
            'date_birth' => ['required', 'date'],
            'level_id' => ['required', 'numeric'],
            'grade_id' => ['required', 'numeric'],
            'classroom_id' => ['required', 'numeric'],
            'academic_year' => ['required', 'numeric'],
            'image_path' => ['nullable', 'string'],
            'created_at' => ['nullable', 'date'],
            'updated_at' => ['nullable', 'date'],
        ];
    }
}
