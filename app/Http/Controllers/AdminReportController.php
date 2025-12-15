<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportEvidence;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminReportController extends Controller
{
    public function index(Request $request)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $status = $request->get('status');
        $search = $request->get('search');

        $reports = Report::with('evidences')
            ->when($status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->when($search, function($query, $search) {
                return $query->where(function($q) use ($search) {
                    $q->where('ticket_id', 'like', "%{$search}%")
                      ->orWhere('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'stats' => [
                'total' => Report::count(),
                'pending' => Report::where('status', 'pending')->count(),
                'verified' => Report::where('status', 'verified')->count(),
                'investigation' => Report::where('status', 'investigation')->count(),
                'resolved' => Report::where('status', 'resolved')->count(),
                'rejected' => Report::where('status', 'rejected')->count(),
            ]
        ]);
    }

    public function show(Report $report)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        // Load evidences
        $report->load('evidences');
        
        return Inertia::render('Admin/Reports/Show', [
            'report' => $report,
        ]);
    }

    public function verify(Request $request, Report $report)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        // Update status ke verified TANPA kolom baru
        $report->update([
            'status' => 'verified',
            'admin_note' => 'Laporan telah diverifikasi oleh admin. Akan diproses ke tahap investigasi.',
            // HAPUS 'assigned_to' dan timestamp jika belum ada di database
        ]);

        return back()->with('success', 'Laporan berhasil diverifikasi!');
    }

    public function reject(Request $request, Report $report)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'reason' => 'required|string|min:10|max:500',
        ]);

        $report->update([
            'status' => 'rejected',
            'admin_note' => $validated['reason'],
            // HAPUS 'rejected_at' jika belum ada di database
        ]);

        return back()->with('success', 'Laporan berhasil ditolak dengan alasan.');
    }

    public function investigate(Request $request, Report $report)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'investigator_note' => 'required|string|min:10|max:500',
        ]);

        if ($report->status !== 'verified') {
            return back()->with('error', 'Laporan harus dalam status terverifikasi.');
        }

        $report->update([
            'status' => 'investigation',
            'admin_note' => $validated['investigator_note'],
            // HAPUS 'investigation_started_at' jika belum ada di database
        ]);

        return back()->with('success', 'Laporan berhasil dipindahkan ke tahap investigasi.');
    }

    public function resolve(Request $request, Report $report)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'resolution_note' => 'required|string|min:20|max:1000',
            'resolution_type' => 'required|in:mediation,punishment,awareness,other',
        ]);

        if ($report->status !== 'investigation') {
            return back()->with('error', 'Laporan harus dalam tahap investigasi.');
        }

        $report->update([
            'status' => 'resolved',
            'admin_note' => $validated['resolution_note'] . ' [Tipe: ' . $validated['resolution_type'] . ']',
            // HAPUS 'resolved_at' jika belum ada di database
        ]);

        return back()->with('success', 'Laporan berhasil diselesaikan.');
    }

    public function downloadEvidence(ReportEvidence $evidence)
    {
        // Tambahkan pengecekan manual
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        if (!Storage::disk('public')->exists($evidence->file_path)) {
            abort(404);
        }

        return Storage::disk('public')->download($evidence->file_path);
    }
}