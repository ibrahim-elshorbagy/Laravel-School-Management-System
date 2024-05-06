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
        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');

            //father information
            $table->string('name_father')->nullable();
            $table->string('phone_father')->nullable();
            $table->string('job_father')->nullable();
            $table->string('passport_id_father')->nullable();
            $table->unsignedBigInteger('national_id_father')->nullable();
            $table->foreign('national_id_father')->references('id')->on('nationalities')->nullable();
            $table->string('address_father')->nullable();

            //mother information
            $table->string('name_mother')->nullable();
            $table->string('phone_mother')->nullable();
            $table->string('job_mother')->nullable();
            $table->string('passport_id_mother')->nullable();
            $table->unsignedBigInteger('national_id_mother')->nullable();
            $table->foreign('national_id_mother')->references('id')->on('nationalities')->nullable();
            $table->string('address_mother')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parents');
    }
};

