<?php

namespace App\Http\Controllers;

use App\Models\Evidence;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EvidenceController extends Controller
{
    public function store(Request $request, Report $report)
    {
        $request->validate([
            'files' => 'required|array|max:10',
            'files.*' => 'file|max:20480|mimes:jpg,jpeg,png,gif,mp4,mov,avi,wmv,pdf,doc,docx,txt,mp3,wav',
            'descriptions' => 'nullable|array',
            'descriptions.*' => 'nullable|string|max:255',
        ]);

        $uploadedFiles = [];

        foreach ($request->file('files') as $index => $file) {
            // Tentukan tipe file
            $mimeType = $file->getMimeType();
            $fileType = $this->getFileType($mimeType);
            
            // Generate nama file yang unik
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '_' . time() . '_' . Str::random(5) . '.' . $extension;
            
            // Simpan file ke storage
            $path = $file->storeAs('evidences/' . $report->id, $fileName, 'public');
            
            // Simpan ke database
            $evidence = Evidence::create([
                'report_id' => $report->id,
                'file_path' => $path,
                'file_name' => $originalName,
                'file_type' => $fileType,
                'file_size' => $file->getSize(),
                'mime_type' => $mimeType,
                'description' => $request->descriptions[$index] ?? null,
            ]);

            $uploadedFiles[] = $evidence;
        }

        return response()->json([
            'success' => true,
            'message' => count($uploadedFiles) . ' file berhasil diupload',
            'evidences' => $uploadedFiles,
        ]);
    }

    public function destroy(Evidence $evidence)
    {
        // Hapus file dari storage
        Storage::disk('public')->delete($evidence->file_path);
        
        // Hapus dari database
        $evidence->delete();

        return response()->json([
            'success' => true,
            'message' => 'File berhasil dihapus',
        ]);
    }

    public function download(Evidence $evidence)
    {
        // Cek apakah file ada
        if (!Storage::disk('public')->exists($evidence->file_path)) {
            abort(404);
        }

        // Download file
        return Storage::disk('public')->download($evidence->file_path, $evidence->file_name);
    }

    private function getFileType($mimeType)
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        } elseif (str_starts_with($mimeType, 'video/')) {
            return 'video';
        } elseif (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        } elseif (in_array($mimeType, [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ])) {
            return 'document';
        }

        return 'document';
    }
}