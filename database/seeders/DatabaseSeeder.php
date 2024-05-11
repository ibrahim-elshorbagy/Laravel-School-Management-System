<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Project;
use App\Models\User;
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
        // User::factory(10)->create();

        $this->call(SeedersNationalitiesSeeder::class);
        $this->call(SpecializationSeeder::class);
        $this->call(SchoolSeeder::class);

        // Project::factory()
        //     ->count(30)
        //     ->hasTasks(30)
        //     ->create();

    User::factory()->create([
            'id' => 1,
            'name' => 'Ibrahim',
            'email' => 'a@a.a',
            'password' => bcrypt('a'),
            'email_verified_at' => time()
        ]);
        User::factory()->create([
            'id' => 2,
            'name' => 'testo',
            'email' => 'testo@example.com',
            'password' => bcrypt('asd'),
            'email_verified_at' => time()
        ]);



    }
}
