<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'ticket_id',
        'access_pin',
        'user_id',
        'title',
        'category',
        'description',
        'location',
        'incident_date',
        'status',
        'admin_note'
    ];

    protected $casts = [
        'incident_date' => 'datetime',
    ];

    /**
     * Relasi ke user pembuat laporan
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke evidence (bukti laporan)
     * Satu report bisa punya banyak evidence
     */
    public function evidences(): HasMany
    {
        return $this->hasMany(ReportEvidence::class);
    }

    /**
     * Accessor: hitung total ukuran semua evidence
     * Otomatis dipanggil pakai $report->total_evidence_size
     */
    public function getTotalEvidenceSizeAttribute()
    {
        return $this->evidences->sum('file_size');
    }

    /**
     * Helper warna badge status
     */
    public function getStatusColor(): string
    {
        return match($this->status) {
            'pending'        => 'bg-yellow-100 text-yellow-800',
            'verified'       => 'bg-blue-100 text-blue-800',
            'investigation'  => 'bg-purple-100 text-purple-800',
            'resolved'       => 'bg-green-100 text-green-800',
            'rejected'       => 'bg-red-100 text-red-800',
            default          => 'bg-gray-100 text-gray-800',
        };
    }

    /**
     * Helper label kategori
     */
    public function getCategoryLabel(): string
    {
        return match($this->category) {
            'fisik'    => 'Fisik',
            'verbal'   => 'Verbal',
            'cyber'    => 'Cyber Bullying',
            'seksual'  => 'Seksual',
            'akademik' => 'Akademik',
            'lain'     => 'Lainnya',
            default    => $this->category,
        };
    }
}
