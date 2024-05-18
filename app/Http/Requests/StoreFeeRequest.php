<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFeeRequest extends FormRequest
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
            'amount' => ['required', 'numeric'],
            'level_id' => ['nullable', 'numeric'],
            'grade_id' => ['nullable', 'numeric',
            Rule::unique('fees')->where(function($query){
            $query->where('year',$this->year)->where('grade_id',$this->grade_id);})
             ],
            'year' => ['nullable'],
            'type'=>['required','string']
        ];
    }

    public function messages()
    {
        return [
            'grade_id.unique' => 'The combination of grade and year already exists.',
        ];
    }
}
