<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id')->unique();
            $table->string('access_pin');
            $table->foreignId('user_id')->nullable();
            $table->string('title');
            $table->enum('category', [
                'fisik', 
                'verbal', 
                'cyber', 
                'seksual', 
                'akademik', 
                'lain'
            ]);
            $table->text('description');
            $table->string('location');
            $table->dateTime('incident_date');
            $table->enum('status', [
                'pending',
                'verified',
                'investigation',
                'resolved',
                'rejected'
            ])->default('pending');
            $table->text('admin_note')->nullable();
            $table->timestamps();
            
            $table->index('ticket_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};