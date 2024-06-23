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
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');

            // $table->string('email')->unique();
            // $table->string('password');
            // $table->text('name')->nullable();

            $table->string('phone')->nullable();
            $table->string('job')->nullable();
            $table->string('passport_id')->nullable();
            $table->unsignedBigInteger('national_id')->nullable();
            $table->foreign('national_id')->references('id')->on('nationalities')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};
