<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class PaymentMethodController extends Controller
{

public function methods()
{
    return inertia('Accountant/Pages/PayWithPaymob/Config', [
        'success' => session('success'),
    ]);
}

public function pay(Request $request)
{

    // ---------------------------- Data

    $amount = $request['amount'];
    $currency = $request['currency'];
    $name = $request['name'];
    $phoneNumber = $request['phoneNumber'];
    $email = $request['email'];
    $description = $request['description'];

    // Convert amount to cents
    $amountCents = $amount * 100;

    // Split the name into first name and last name for the shipping data
    $nameParts = explode(' ', $name, 2);
    $firstName = $nameParts[0];
    $lastName = isset($nameParts[1]) ? $nameParts[1] : '';


    $headers = [
        'Content-Type' => 'application/json',
    ];

    // ---------------------------- First Call: Get Token
    $DataOne = [
        "api_key" => env('PAYMOB_API_KEY'),
    ];

    $responseOne = Http::withHeaders($headers)->post('https://accept.paymob.com/api/auth/tokens', $DataOne);
    $responseOneData = $responseOne->json();
    $AuthToken = $responseOneData['token'];

    // ---------------------------- Second Call: Create Order
    $DataTwo = [
        "auth_token" => $AuthToken,
        "api_source" => "INVOICE",
        "amount_cents" => (string) $amountCents,
        "currency" => "EGP",
        "shipping_data" => [
                "first_name" => $firstName,
                "last_name" => $lastName,
                "phone_number" => $phoneNumber,
                "email" => $email
            ],
        "integrations" => [4604787],
        "items" => [
                [
                    "name" => "School Invoice",
                    "amount_cents" => (string) $amountCents,
                    "quantity" => 1,
                    "description" => $description
                ]
            ],
        "delivery_needed" => "false"
    ];
    $responseTwo = Http::withHeaders($headers)->post('https://accept.paymob.com/api/ecommerce/orders', $DataTwo);

    // Output the response for debugging
    dd($responseTwo->json());
}

public function testoa(Request $request)
    {
        $amount = $request['amount'];
        $currency = $request['currency'];
        $name = $request['name'];
        $phoneNumber = $request['phoneNumber'];
        $email = $request['email'];
        $description = $request['description'];

        $headers = [
            'Content-Type' => 'application/json',
        ];

        // ---------------------------- First Call: Get Auth Token
        $DataOne = [
            "api_key" => env('PAYMOB_API_KEY'),
        ];

        $responseOne = Http::withHeaders($headers)->post('https://accept.paymob.com/api/auth/tokens', $DataOne)->json();
        $AuthToken = $responseOne['token'];

        // Convert amount to cents
        $amountCents = $amount * 100;

        // Split the name into first name and last name for the shipping data
        $nameParts = explode(' ', $name, 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

        // ---------------------------- Second Call: Create INVOICE
        $DataTwo = [
            "auth_token" => $AuthToken,
            "amount_cents" => (string) $amountCents,
            "currency" => $currency,
            "shipping_data" => [
                "first_name" => $firstName,
                "last_name" => $lastName,
                "phone_number" => $phoneNumber,
                "email" => $email
            ],
            "integrations" => [4604787],
            "items" => [
                [
                    "name" => "School Invoice",
                    "amount_cents" => (string) $amountCents,
                    "quantity" => 1,
                    "description" => $description
                ]
            ],
            "delivery_needed" => "false"
        ];

        $responseTwo = Http::withHeaders($headers)->post('https://accept.paymob.com/api/ecommerce/orders', $DataTwo)->json();

         dd($responseTwo);
    }


}

