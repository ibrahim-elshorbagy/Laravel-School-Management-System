<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        // Create Users and Guardians
        for ($i = 1; $i <= 2; $i++) {
            $user = User::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => bcrypt('password'),
                'role'=>'guardian',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            DB::table('guardians')->insert([
                'user_id' => $user->id,
                'phone' => '0501234567',
                'job' => 'Teacher',
                'passport_id' => '123123456',
                'national_id' => 51,
                'address' => 'Egypt',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        // Create Users and Students

        for ($i = 1; $i <= 99; $i++) {
            $user = User::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => bcrypt('password'),
                'role'=>'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            DB::table('students')->insert([
                [
                    'user_id' => $user->id,
                    'gender' => ($i % 2 == 0) ? 'Male' : 'Female',
                    'national_id' => 51,
                    'date_birth' => Carbon::now()->subYears(10 + $i),
                    'level_id' => rand(1, 2),
                    'grade_id' => 1,
                    'classroom_id' => 1,
                    'guardian_id' => rand(1, 2),
                    'academic_year' => '2022',
                    'image_path' => '',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
            ]);
        }

        DB::table('fees')->insert([
            [
                'id' => 1,
                'name' => 'Bus Fees',
                'amount' => 1000,
                'level_id' => null,
                'grade_id' => null,
                'year' => 2022,
                'type' => 'puhlic',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'name' => 'School Fees',
                'amount' => 1000,
                'level_id' => 1,
                'grade_id' => 1,
                'year' => 2022,
                'type' => 'specific',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }


}
