<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('levels')->delete();
        DB::table('grades')->delete();
        DB::table('classrooms')->delete();
        DB::table('guardians')->delete();
        DB::table('students')->delete();
        DB::table('users')->delete(); // Make sure to delete users table if necessary

        // Create levels, grades, and classrooms
        $levels = ['Elementary', 'Middle School', 'High School'];
        foreach ($levels as $key => $levelName) {
            $level = Level::create(['name' => $levelName]);

            if ($levelName === 'Elementary') {
                $grades = ['Grade one', 'Grade two', 'Grade three', 'Grade four', 'Grade five', 'Grade six'];
            } elseif ($levelName === 'Middle') {
                $grades = ['Grade one', 'Grade two', 'Grade three'];
            } else {
                $grades = ['Grade one', 'Grade two', 'Grade three'];
            }

            foreach ($grades as $gradeName) {
                $grade = Grade::create(['name' => $gradeName, 'level_id' => $level->id]);

                $classrooms = ['Class A', 'Class B', 'Class C'];
                foreach ($classrooms as $className) {
                    Classroom::create(['name' => $className, 'grade_id' => $grade->id, 'level_id' => $level->id,'status'=>'active']);
                }
            }
        }



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

        for ($i = 1; $i <= 99; $i++) {
            $user = User::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => bcrypt('password'),
                'role'=>'teacher',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            DB::table('teachers')->insert([
                [
                    'id' => $i,
                    'user_id' => $user->id,
                    'specialization_id' => rand(1, 14),
                    'level_id' => rand(1, 3),
                    'gender' => ($i % 2 == 0) ? 'Male' : 'Female',
                    'address' => 'Egypt',
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
