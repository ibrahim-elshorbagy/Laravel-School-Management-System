<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Guardian;
use App\Models\Project;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\NationalitiesSeeder as SeedersNationalitiesSeeder;
use Database\Seeders\SchoolSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

         User::factory()->create([
            'id'=>1,
            'name' => 'Ibrahim Admin',
            'email' => 'a@a.a',
            'role' => 'admin',
            'password' => bcrypt('a'),
            'email_verified_at' => time()
        ]);

        $this->call(SeedersNationalitiesSeeder::class);
        $this->call(SpecializationSeeder::class);
        $this->call(SchoolSeeder::class);


        Teacher::insert([
            [
                'user_id' => 1,
                'specialization_id' => 1,
                'level_id' => 3,
                'gender' =>'Male',
                'address' => 'Egypt',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

        Guardian::insert([
            [
                'user_id' => 1,
                'phone' => '0501234567',
                'job' => 'Super Admin',
                'passport_id' => '123123456',
                'national_id' => 51,
                'address' => 'Egypt',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

        Student::insert([
            [
                'user_id' => 1,
                'gender' => 'Male',
                'national_id' => 51,
                'date_birth' =>2000/4/4,
                'level_id' => 3,
                'grade_id' => 3,
                'classroom_id' => 3,
                'guardian_id' => rand(1, 2),
                'academic_year' => '2022',
                'image_path' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);


        // Project::factory()
        //     ->count(30)
        //     ->hasTasks(30)
        //     ->create();



    }
}
