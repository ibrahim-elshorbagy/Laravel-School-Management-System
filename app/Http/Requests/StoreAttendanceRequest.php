<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
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
    public function messages(): array
    {
        return [
            'students.*.attendance.required' => 'Student attendance is required.',
        ];
    }

    public function rules(): array
    {
         return [
            'students.*.id' => ['required', 'numeric'],
            'students.*.level_id' => ['required', 'numeric'],
            'students.*.grade_id' => ['required', 'numeric'],
            'students.*.classroom_id' => ['required', 'numeric'],
            'students.*.teacher_id' => ['required', 'numeric'],
            'students.*.attendance' => ['required', 'boolean'],
            'students.*.date' => ['required', 'date', 'date_format:Y-m-d'],
        ];
    }
}

