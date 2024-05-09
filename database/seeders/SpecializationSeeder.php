<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecializationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('specializations')->delete();

        DB::table('specializations')->insert([
            ['id' => 1, 'name' => 'Math'],
            ['id' => 2, 'name' => 'Computer'],
            ['id' => 3, 'name' => 'English'],
            ['id' => 4, 'name' => 'Science'],
            ['id' => 5,  'name' => 'History'],
            ['id' => 6,  'name' => 'Geography'],
            ['id' => 7,  'name' => 'Literature'],
            ['id' => 8,  'name' => 'Art'],
            ['id' => 9,  'name' => 'Music'],
            ['id' => 10, 'name' => 'Physical Education'],
            ['id' => 11, 'name' => 'Chemistry'],
            ['id' => 12, 'name' => 'Physics'],
            ['id' => 13, 'name' => 'Biology'],
            ['id' => 14, 'name' => 'Economics'],
        ]);
    }
}
