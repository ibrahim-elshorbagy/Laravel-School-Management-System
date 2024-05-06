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
            $table->string('name_father');
            $table->string('phone_father');
            $table->string('job_father');
            $table->string('passport_id_father');
            $table->unsignedBigInteger('national_id_father');
            $table->foreign('national_id_father')->references('id')->on('nationalities');
            $table->string('address_father');

            //mother information
            $table->string('name_mother');
            $table->string('phone_mother');
            $table->string('job_mother');
            $table->string('passport_id_mother');
            $table->unsignedBigInteger('national_id_mother');
            $table->foreign('national_id_mother')->references('id')->on('nationalities');
            $table->string('address_mother');

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

