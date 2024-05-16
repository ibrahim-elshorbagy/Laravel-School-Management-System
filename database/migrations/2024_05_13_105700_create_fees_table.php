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
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('amount',8,2);
            $table->foreignId('level_id')->nullable()->references('id')->on('levels')->onDelete('cascade');
            $table->foreignId('grade_id')->nullable()->references('id')->on('grades')->onDelete('cascade');
            $table->string('year')->nullable();
            $table->string('type')->default('specific');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fees');
    }
};
