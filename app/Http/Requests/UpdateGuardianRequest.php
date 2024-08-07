<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateGuardianRequest extends FormRequest
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
        $userId = $this->route("guardian.user_id");

        return [
                'email' => ['required','email',Rule::unique('users')->ignore($userId),],
                'password' => ['nullable', 'min:8'],
                'name' => ['string'],
                'passport_id' => ['numeric'],
                'phone' => ['numeric'],
                'job' => ['string', 'max:255'],
                'national_id' => ['numeric'],
                'address' => ['string', 'max:255'],

        ];
    }
}
