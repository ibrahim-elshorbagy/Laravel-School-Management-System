<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
            'guardian_email' => ['nullable', 'email','unique:guardians,email'],
            'guardian_password' => ['nullable', 'string'],
            'guardian_name' => ['nullable', 'string'],
            'guardian_phone' => ['nullable', 'numeric'],
            'guardian_passport_id' => ['nullable', 'numeric',],
            'guardian_job' => ['nullable', 'string'],
            'guardian_national_id' => ['nullable', 'numeric'],
            'guardian_address' => ['nullable', 'string'],
            'guardian_id' => ['nullable', 'numeric'],

            'email' => ['required', 'string', 'unique:students,email'],
            'password' => ['required', 'string'],
            'name' => ['required', 'string'],
            'national_id' => ['nullable', 'numeric'],
            'gender' => ['required', 'string'],
            'date_birth' => ['required', 'date', 'date_format:Y-m-d'],
            'level_id' => ['required', 'numeric'],
            'grade_id' => ['required', 'numeric'],
            'classroom_id' => ['required', 'numeric'],
            'academic_year' => ['required', 'numeric'],
            'image' => ['nullable', 'image'],
            'created_at' => ['nullable', 'date'],
            'updated_at' => ['nullable', 'date'],
        ];
    }
}
