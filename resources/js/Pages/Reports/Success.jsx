import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Copy, Shield, FileText } from 'lucide-react';

export default function ReportSuccess({ ticket_id, access_pin }) {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Berhasil disalin!');
    };

    return (
        <DashboardLayout header="Laporan Berhasil Dikirim">
            <Head title="Laporan Sukses - SIPBUL" />

            <div className="max-w-2xl mx-auto">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Laporan Terkirim!
                    </h1>
                    <p className="text-gray-600">
                        Laporan bullying Anda telah berhasil dikirim ke tim satgas.
                    </p>
                </div>

                {/* Warning Box */}
                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                        <Shield className="h-6 w-6 text-yellow-600 mt-1" />
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                ⚠️ SIMPAN KODE INI DENGAN AMAN
                            </h3>
                            <p className="text-yellow-700 text-sm">
                                Kode Tiket dan PIN ini <strong>hanya muncul sekali</strong> dan 
                                <strong> tidak bisa direset</strong>. Admin tidak memiliki akses 
                                ke kode ini. Anda perlu kedua kode ini untuk melacak perkembangan laporan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ticket & PIN Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Ticket ID */}
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-6 w-6 text-blue-600" />
                                <h3 className="font-semibold text-gray-900">Kode Tiket</h3>
                            </div>
                            <button
                                onClick={() => copyToClipboard(ticket_id)}
                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                <Copy className="h-4 w-4" />
                                <span>Salin</span>
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <p className="text-3xl font-bold text-blue-700 font-mono tracking-wider">
                                {ticket_id}
                            </p>
                        </div>
                        <p className="text-sm text-gray-600 text-center mt-2">
                            Gunakan untuk melacak laporan
                        </p>
                    </div>

                    {/* Access PIN */}
                    <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <Shield className="h-6 w-6 text-green-600" />
                                <h3 className="font-semibold text-gray-900">PIN Akses</h3>
                            </div>
                            <button
                                onClick={() => copyToClipboard(access_pin)}
                                className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm"
                            >
                                <Copy className="h-4 w-4" />
                                <span>Salin</span>
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <p className="text-3xl font-bold text-green-700 font-mono tracking-wider">
                                {access_pin}
                            </p>
                        </div>
                        <p className="text-sm text-gray-600 text-center mt-2">
                          6 digit rahasia untuk akses
                        </p>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">
                        Rekomendasi Selanjutnya:
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 text-sm">1</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Screenshot atau foto kode di atas</p>
                                <p className="text-sm text-gray-600">Simpan di tempat yang aman</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 text-sm">2</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Cek perkembangan laporan</p>
                                <p className="text-sm text-gray-600">Gunakan menu "Cek Status" di dashboard</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 text-sm">3</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Tunggu respon dari tim satgas</p>
                                <p className="text-sm text-gray-600">Proses verifikasi membutuhkan waktu 1-3 hari kerja</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href={route('dashboard')}
                        className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                        Kembali ke Dashboard
                    </Link>
                    <Link
                        href={route('track.form')}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:shadow-lg transition-all text-center"
                    >
                        Cek Status Laporan
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}