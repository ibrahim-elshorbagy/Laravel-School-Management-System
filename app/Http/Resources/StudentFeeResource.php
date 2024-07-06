<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentFeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount, // Adjust according to your actual column names
            'type' => $this->type,
            'debit' => $this->debit,
            'credit' => $this->credit,
            'feeInvoiceId' => $this->fee_invoice_id,
            'created_at' => $this->created_at->format('Y-m-d'), // Format dates as needed
        ];
    }
}
