<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportEvidence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function create()
    {
        return Inertia::render('Reports/Create');
    }

    public function store(Request $request)
    {
        // Validasi form
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:fisik,verbal,cyber,seksual,akademik,lain',
            'description' => 'required|string|min:50',
            'location' => 'required|string|max:255',
            'incident_date' => 'required|date',
            'evidences' => 'nullable|array',
            'evidences.*' => 'file|max:5120|mimes:jpg,jpeg,png,pdf,doc,docx',
        ]);

        // Generate unik ticket ID
        $ticketId = 'SIP-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        // Generate PIN 6 digit
        $plainPin = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Buat laporan (ANONIM → user_id = null)
        $report = Report::create([
            'ticket_id'      => $ticketId,
            'access_pin'     => Hash::make($plainPin),
            'user_id'        => null,
            'title'          => $validated['title'],
            'category'       => $validated['category'],
            'description'    => $validated['description'],
            'location'       => $validated['location'],
            'incident_date'  => $validated['incident_date'],
            'status'         => 'pending',
        ]);

        // Upload file bukti (opsional)
        if ($request->hasFile('evidences')) {
            foreach ($request->file('evidences') as $file) {
                $path = $file->store('evidences', 'public');

                ReportEvidence::create([
                    'report_id' => $report->id,
                    'file_path' => $path,
                    'file_type' => $file->getMimeType(),
                ]);
            }
        }

        // Redirect ke halaman success + kirim ticket & PIN
        return redirect()->route('reports.success')->with([
            'ticket_id'  => $ticketId,
            'access_pin' => $plainPin,
            'success'    => 'Laporan berhasil dikirim! Simpan kode tiket dan PIN Anda.',
        ]);
    }

    public function success()
    {
        if (!session('ticket_id')) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Reports/Success', [
            'ticket_id'  => session('ticket_id'),
            'access_pin' => session('access_pin'),
            'success'    => session('success'),
        ]);
    }
}
