<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTeacherRequest extends FormRequest
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
        $userId = $this->route("teacher.user_id");
        return [
            'email' => ['required','email',Rule::unique('users')->ignore($userId),],
            'password' => ['string', 'min:8'],
            'name' => ['string'],
            'address' => ['string', 'max:255'],
            'gender'=>['string'],
            'specialization_id'=>['required'],
            'level_id'=>['required','numeric'],

            ];
    }





}
