<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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

        DB::table('guardians')->insert([
            'email' => 'mohamed@example.com',
            'password' => bcrypt('password'),
            'name' => 'Mohamed elshorbagy',
            'phone' => 0501234567,
            'job' => 'Teacher',
            'passport_id' => '123123456',
            'national_id' => 51,
            'address' => 'Egypt',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('students')->insert([
            [
                'name' => 'Ahmed mohamed',
                'email' => 'student1@example.com',
                'password' => bcrypt('password'),
                'gender' => 'Male',
                'national_id' => 51,
                'date_birth' => '2006-05-10',
                'level_id' => 1,
                'grade_id' => 1,
                'classroom_id' => 1,
                'guardian_id' => 1,
                'academic_year' => '2022',
                'image_path' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ibrahim mohamed',
                'email' => 'student2@example.com',
                'password' => bcrypt('password'),
                'gender' => 'Female',
                'national_id' => 51,
                'date_birth' => '2007-08-15',
                'level_id' => 1,
                'grade_id' => 1,
                'classroom_id' => 1,
                'guardian_id' => 1,
                'academic_year' => '2022',
                'image_path' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Khalid mohamed',
                'email' => 'student3@example.com',
                'password' => bcrypt('password'),
                'gender' => 'Male',
                'national_id' => 51,
                'date_birth' => '2008-11-20',
                'level_id' => 1,
                'grade_id' => 1,
                'classroom_id' => 1,
                'guardian_id' => 1,
                'academic_year' => '2022',
                'image_path' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Belal mohamed',
                'email' => 'student4@example.com',
                'password' => bcrypt('password'),
                'gender' => 'Female',
                'national_id' => 51,
                'date_birth' => '2009-03-25',
                'level_id' => 1,
                'grade_id' => 1,
                'classroom_id' => 1,
                'guardian_id' => 1,
                'academic_year' => '2022',
                'image_path' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

