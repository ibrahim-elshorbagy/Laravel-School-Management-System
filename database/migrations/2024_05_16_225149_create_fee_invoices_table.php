<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fee_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreignId('level_id')->references('id')->on('levels')->onDelete('cascade');
            $table->foreignId('grade_id')->references('id')->on('grades')->onDelete('cascade');
            $table->foreignId('fee_id')->references('id')->on('fees')->onDelete('cascade');
            $table->decimal('amount',8,2);
            $table->string('description')->nullable();
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_invoices');
    }
};
