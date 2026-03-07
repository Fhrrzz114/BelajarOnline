<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'classroom',
        'day',
        'subject',
        'start_time',
        'end_time',
        'teacher_name',
    ];
}
