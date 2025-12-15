<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminReportController;
use App\Http\Controllers\EvidenceController;
use App\Http\Controllers\TrackController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome');
})->name('welcome');

// ============================
// PUBLIC TRACK ROUTES
// ============================
Route::get('/track', [TrackController::class, 'showTrackForm'])->name('track.form');
Route::post('/track', [TrackController::class, 'trackReport'])->name('track.check');


// ============================
// AUTHENTICATED USER ROUTES
// ============================
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', fn() => inertia('Dashboard'))->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Reports
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/success', [ReportController::class, 'success'])->name('reports.success');
    Route::get('/reports/my', [ReportController::class, 'myReports'])->name('reports.my');


    // ============================
    // USER EVIDENCE ROUTES
    // ============================
    Route::post('/reports/{report}/evidences', [EvidenceController::class, 'store'])
        ->name('reports.evidences.store');

    Route::delete('/evidences/{evidence}', [EvidenceController::class, 'destroy'])
        ->name('evidences.destroy');

    Route::get('/evidences/{evidence}/download', [EvidenceController::class, 'download'])
        ->name('evidences.download');
});


// ============================
// ADMIN ROUTES
// ============================
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Report Management
        Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/{report}', [AdminReportController::class, 'show'])->name('reports.show');

        Route::post('/reports/{report}/verify', [AdminReportController::class, 'verify'])->name('reports.verify');
        Route::post('/reports/{report}/reject', [AdminReportController::class, 'reject'])->name('reports.reject');
        Route::post('/reports/{report}/investigate', [AdminReportController::class, 'investigate'])->name('reports.investigate');
        Route::post('/reports/{report}/resolve', [AdminReportController::class, 'resolve'])->name('reports.resolve');

        // ============================
        // ADMIN EVIDENCE DOWNLOAD
        // ============================
        Route::get('/evidences/{evidence}/download', [EvidenceController::class, 'download'])
            ->name('evidences.download');
    });

require __DIR__.'/auth.php';
