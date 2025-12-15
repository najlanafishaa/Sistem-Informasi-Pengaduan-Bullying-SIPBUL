<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function showTrackForm()
    {
        return Inertia::render('Track/Index');
    }

    public function trackReport(Request $request)
    {
        $validated = $request->validate([
            'ticket_id' => 'required|string',
            'access_pin' => 'required|string|min:6|max:6',
        ]);

        $report = Report::where('ticket_id', $validated['ticket_id'])->first();

        if (!$report) {
            return back()->withErrors([
                'ticket_id' => 'Tiket tidak ditemukan.',
            ]);
        }

        if (!Hash::check($validated['access_pin'], $report->access_pin)) {
            return back()->withErrors([
                'access_pin' => 'PIN tidak valid.',
            ]);
        }

        return Inertia::render('Track/Show', [
            'report' => $report,
        ]);
    }
}