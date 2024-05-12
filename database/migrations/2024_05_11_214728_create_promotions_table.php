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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');

            $table->unsignedBigInteger('from_level');
            $table->foreign('from_level')->references('id')->on('levels')->onDelete('cascade');

            $table->unsignedBigInteger('from_grade');
            $table->foreign('from_grade')->references('id')->on('grades')->onDelete('cascade');

            $table->unsignedBigInteger('from_classroom');
            $table->foreign('from_classroom')->references('id')->on('classrooms')->onDelete('cascade');

            $table->unsignedBigInteger('to_level');
            $table->foreign('to_level')->references('id')->on('levels')->onDelete('cascade');

            $table->unsignedBigInteger('to_grade');
            $table->foreign('to_grade')->references('id')->on('grades')->onDelete('cascade');

            $table->unsignedBigInteger('to_classroom');
            $table->foreign('to_classroom')->references('id')->on('classrooms')->onDelete('cascade');

            $table->string('academic_year');
            $table->string('academic_year_new');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
