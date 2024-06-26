<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'level_id' => ['required', 'numeric'],
            'grade_id' => ['required', 'numeric'],
            'classroom_id' => ['required', 'numeric'],
            'subject_id' => ['required', 'numeric'],
            'teacher_id' => ['required', 'numeric'],
            'questions' => ['required', 'array'],
            'questions.*.question' => ['required', 'string'],
            'questions.*.answers' => ['required', 'array'],
            'questions.*.answers.*.text' => ['required', 'string'],
            'questions.*.answers.*.isCorrect' => ['required', 'boolean'],
        ];

    }
    public function messages(): array
    {
        return [
            'questions.*.question.required' => 'Question is required',
            'questions.*.answers.min' => 'At least one answer is required',
            'questions.*.answers.max' => 'Maximum 4 answers are allowed',
            'questions.*.answers.*.text.max' => 'Answer text maximum 255 characters',
        ];
    }
}
