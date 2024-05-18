<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeeInvoiceRequest extends FormRequest
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
            'amount' => ['required', 'numeric'],
            'fee_id' => ['required', 'numeric'],
            'student_id' => ['required', 'numeric'],
            'description' => ['nullable','string'],
        ];
    }
}
