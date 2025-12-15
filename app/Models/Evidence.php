<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evidence extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'file_path',
        'file_name',
        'file_type',
        'file_size',
        'mime_type',
        'description',
    ];

    protected $casts = [
        'file_size' => 'integer',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    // Helper untuk mendapatkan URL file
    public function getFileUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
    }

    // Helper untuk menentukan icon berdasarkan tipe file
    public function getFileIconAttribute()
    {
        $icons = [
            'image' => 'image',
            'video' => 'video',
            'document' => 'file-text',
            'audio' => 'music',
            'application/pdf' => 'file-text',
            'text' => 'file-text',
        ];

        foreach ($icons as $key => $icon) {
            if (str_contains($this->mime_type, $key) || $this->file_type === $key) {
                return $icon;
            }
        }

        return 'file';
    }
}