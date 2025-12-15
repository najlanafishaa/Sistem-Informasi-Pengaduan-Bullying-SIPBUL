<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // Tambahkan kolom assigned_to jika belum ada
            if (!Schema::hasColumn('reports', 'assigned_to')) {
                $table->foreignId('assigned_to')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            }
            
            // Tambahkan kolom verified_at jika belum ada
            if (!Schema::hasColumn('reports', 'verified_at')) {
                $table->timestamp('verified_at')->nullable()->after('status');
            }
            
            // Tambahkan kolom investigation_started_at jika belum ada
            if (!Schema::hasColumn('reports', 'investigation_started_at')) {
                $table->timestamp('investigation_started_at')->nullable()->after('verified_at');
            }
            
            // Tambahkan kolom resolved_at jika belum ada
            if (!Schema::hasColumn('reports', 'resolved_at')) {
                $table->timestamp('resolved_at')->nullable()->after('investigation_started_at');
            }
            
            // Tambahkan kolom rejected_at jika belum ada
            if (!Schema::hasColumn('reports', 'rejected_at')) {
                $table->timestamp('rejected_at')->nullable()->after('resolved_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['assigned_to']);
            $table->dropColumn('assigned_to');
            
            // Hapus kolom jika ada
            if (Schema::hasColumn('reports', 'verified_at')) {
                $table->dropColumn('verified_at');
            }
            if (Schema::hasColumn('reports', 'investigation_started_at')) {
                $table->dropColumn('investigation_started_at');
            }
            if (Schema::hasColumn('reports', 'resolved_at')) {
                $table->dropColumn('resolved_at');
            }
            if (Schema::hasColumn('reports', 'rejected_at')) {
                $table->dropColumn('rejected_at');
            }
        });
    }
};