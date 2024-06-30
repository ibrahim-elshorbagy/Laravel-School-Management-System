<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountantRequest extends FormRequest
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
        $userId = $this->route("accountant.user_id");
        return [
                'email' => ['required','email',Rule::unique('users')->ignore($userId),],
                'password' => ['nullable', 'min:8'],
                'name' => ['string'],
                'phone' => ['numeric'],
                'level_id' => ['numeric'],
                'address' => ['string', 'max:255'],

        ];
    }
}
