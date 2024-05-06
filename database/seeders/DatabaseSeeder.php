<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Project;
use App\Models\User;
use Database\Seeders\NationalitiesSeeder as SeedersNationalitiesSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use NationalitiesSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

    User::factory()->create([
            'id' => 1,
            'name' => 'a',
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


        // Project::factory()
        //     ->count(30)
        //     ->hasTasks(30)
        //     ->create();

            $this->call(SeedersNationalitiesSeeder::class);
    }


}
