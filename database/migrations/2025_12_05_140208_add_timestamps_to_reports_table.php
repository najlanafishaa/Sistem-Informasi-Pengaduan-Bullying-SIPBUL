<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // Tambahkan kolom timestamp untuk status
            $table->timestamp('verified_at')->nullable()->after('status');
            $table->timestamp('investigation_started_at')->nullable()->after('verified_at');
            $table->timestamp('resolved_at')->nullable()->after('investigation_started_at');
            $table->timestamp('rejected_at')->nullable()->after('resolved_at');
            
            // Tambahkan kolom untuk menyimpan admin yang assign (opsional)
            $table->foreignId('assigned_to')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            
            // Tambahkan kolom untuk notes (opsional)
            $table->text('investigation_notes')->nullable()->after('admin_note');
            $table->text('resolution_notes')->nullable()->after('investigation_notes');
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn([
                'verified_at',
                'investigation_started_at',
                'resolved_at',
                'rejected_at',
                'assigned_to',
                'investigation_notes',
                'resolution_notes'
            ]);
        });
    }
};