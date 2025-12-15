<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->json('admin_notes')->nullable()->after('admin_note');
      
            $table->foreignId('assigned_admin_id')->nullable()->after('user_id');
            
            // Tambahkan kolom untuk tanggal aksi admin
            $table->timestamp('verified_at')->nullable()->after('status');
            $table->timestamp('investigation_started_at')->nullable()->after('verified_at');
            $table->timestamp('resolved_at')->nullable()->after('investigation_started_at');
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn(['admin_notes', 'assigned_admin_id', 'verified_at', 'investigation_started_at', 'resolved_at']);
        });
    }
};