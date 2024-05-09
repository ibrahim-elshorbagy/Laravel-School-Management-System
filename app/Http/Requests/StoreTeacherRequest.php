<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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
        'email' => ['email','unique:teachers,email'],
        'password' => ['string', 'min:8'],
        'name' => ['string'],
        'address' => ['string', 'max:255'],
        'gender'=>['string'],
        'specialization_id'=>['numeric'],
        ];
    }
}
