<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin Account
        User::create([
            'name' => 'Admin SIPBUL',
            'identifier' => 'admin',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Sample Student Accounts
        $students = [
            [
                'name' => 'Najlaa Nafisha Aulia',
                'identifier' => '2355061001',
                'password' => Hash::make('123'),
                'role' => 'user',
            ],
            [
                'name' => 'Annisa Dina Maharani',
                'identifier' => '2315061041',
                'password' => Hash::make('student123'),
                'role' => 'user',
            ],
            [
                'name' => 'Syandra Zahira',
                'identifier' => '2315061017',
                'password' => Hash::make('student123'),
                'role' => 'user',
            ],
        ];

        foreach ($students as $student) {
            User::create($student);
        }

        $this->call([
            // Tambahkan seeders lain jika diperlukan
        ]);
    }
}