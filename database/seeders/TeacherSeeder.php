<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $levels = ['Elementary', 'Middle School', 'High School'];
        $levelGrades = [];
        foreach ($levels as $key => $levelName) {
            $level = Level::create(['name' => $levelName]);

            if ($levelName === 'Elementary') {
                $grades = ['Grade one', 'Grade two', 'Grade three', 'Grade four', 'Grade five', 'Grade six'];
            } elseif ($levelName === 'Middle School') {
                $grades = ['Grade one', 'Grade two', 'Grade three'];
            } else {
                $grades = ['Grade one', 'Grade two', 'Grade three'];
            }

            foreach ($grades as $gradeIndex => $gradeName) {
                $grade = Grade::create(['name' => $gradeName, 'level_id' => $level->id]);

                $classrooms = ['Class A', 'Class B', 'Class C'];
                foreach ($classrooms as $className) {
                    Classroom::create(['name' => $className, 'grade_id' => $grade->id, 'level_id' => $level->id, 'status' => 'active']);
                }

                // Store the grade IDs based on the level for later use
                $levelGrades[$level->id][] = $grade->id;
            }
        }

        // Create users and assign them as teachers
        $teachers = [];
        for ($i = 1; $i <= 99; $i++) {
            $user = User::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => bcrypt('password'),
                'role' => 'teacher',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $levelId = rand(1, 3);
            $specializationId = rand(1, 14);

            DB::table('teachers')->insert([
                [
                    'id' => $i,
                    'user_id' => $user->id,
                    'specialization_id' => $specializationId,
                    'level_id' => $levelId,
                    'gender' => ($i % 2 == 0) ? 'Male' : 'Female',
                    'address' => 'Egypt',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
            ]);

            // Store teacher level and specialization for subject assignment
            $teachers[$i] = [
                'level_id' => $levelId,
                'specialization_id' => $specializationId,
            ];
        }

        // Create subjects and assign them to teachers with grades
        $faker = Faker::create();
        $subjects = [];
        for ($i = 1; $i <= 100; $i++) {
            $teacherId = $faker->numberBetween(1, 99);
            $teacher = $teachers[$teacherId];
            $levelId = $teacher['level_id'];
            $specializationId = $teacher['specialization_id'];

            // Select a grade ID that corresponds to the teacher's level
            $gradeId = $faker->randomElement($levelGrades[$levelId]);

            $subjects[] = [
                'id' => $i,
                'specialization_id' => $specializationId, // Use the same specialization_id as the teacher
                'level_id' => $levelId, // Use the level_id from the selected teacher
                'grade_id' => $gradeId, // Use the grade_id that matches the teacher's level
                'teacher_id' => $teacherId, // Assign the subject to the selected teacher
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('subjects')->insert($subjects);
    }
}
