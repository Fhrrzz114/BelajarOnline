<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamGrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'type',
        'score',
        'classroom',
        'academic_year',
        'semester',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
