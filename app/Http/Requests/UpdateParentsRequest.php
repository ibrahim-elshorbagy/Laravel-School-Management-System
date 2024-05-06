<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateParentsRequest extends FormRequest
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
        'email' => ['email'],
        'password' => ['string', 'min:8'],
        'name_father' => ['string'],
        'passport_id_father' => ['numeric'],
        'phone_father' => ['numeric'],
        'job_father' => ['string', 'max:255'],
        'national_id_father' => ['numeric'],
        'address_father' => ['string', 'max:255'],

        'name_mother' => ['string'],
        'passport_id_mother' => ['numeric'],
        'phone_mother' => ['numeric'],
        'job_mother' => ['string', 'max:255'],
        'national_id_mother' => ['numeric'],
        'address_mother' => ['string', 'max:255'],
        'created_at' => ['nullable', 'date'],
        'updated_at' => ['nullable', 'date'],
        ];


    }

    public function messages(): array
{
    return [
        'email.email' => 'Please enter a valid email address.',
        'password.string' => 'The password must be a string.',
        'password.min' => 'The password must be at least 8 characters.',
        'passport_id_father.numeric' => 'The father\'s passport ID must be a number.',
        'phone_father.numeric' => 'The father\'s phone number must be a number.',
        'job_father.max' => 'The father\'s job may not be greater than 255 characters.',
        'national_id_father.numeric' => 'The father\'s national ID must be a number.',
        'address_father.max' => 'The father\'s address may not be greater than 255 characters.',
        'name_mother.max' => 'The mother\'s name may not be greater than 255 characters.',
        'passport_id_mother.numeric' => 'The mother\'s passport ID must be a number.',
        'phone_mother.numeric' => 'The mother\'s phone number must be a number.',
        'national_id_mother.numeric' => 'The mother\'s national ID must be a number.',
        'address_mother.max' => 'The mother\'s address may not be greater than 255 characters.',
    ];
}
}
