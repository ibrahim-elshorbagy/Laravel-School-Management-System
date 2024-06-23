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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');

            // $table->string('email')->unique();
            // $table->string('password');
            // $table->text('name');

            $table->bigInteger('specialization_id')->unsigned();
            $table->foreign('specialization_id')->references('id')->on('specializations')->onDelete('cascade');
            $table->foreignId('level_id')->references('id')->on('levels')->onDelete('cascade')->onUpdate('cascade');
            $table->string('gender');
            $table->string('address');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
