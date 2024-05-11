<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        $levels = ['Elementary', 'Middle', 'High'];
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
    }
}

