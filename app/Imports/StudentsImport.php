<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Determine password: use 'password' column if it exists and not empty, otherwise fallback to 'nisn'
        $password = isset($row['password']) && !empty($row['password']) 
            ? $row['password'] 
            : $row['nisn'];

        // Use updateOrCreate to avoid duplicates and allow updating student info via Excel
        return User::updateOrCreate(
            ['email' => $row['email']],
            [
                'name'      => $row['nama'],
                'nisn'      => $row['nisn'],
                'classroom' => $row['kelas'],
                'password'  => Hash::make((string)$password),
                'role'      => 'user',
            ]
        );
    }
}
