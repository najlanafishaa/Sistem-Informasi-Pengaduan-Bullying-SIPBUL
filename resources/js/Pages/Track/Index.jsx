import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { Search, Ticket, Lock, Shield, AlertCircle } from 'lucide-react';

export default function TrackIndex() {
    const { data, setData, post, processing, errors } = useForm({
        ticket_id: '',
        access_pin: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('track.check'));
    };

    return (
        <DashboardLayout header="Cek Status Laporan">
            <Head title="Cek Status - SIPBUL" />

            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Search className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Cek Status Laporan
                    </h1>
                    <p className="text-gray-600">
                        Lacak perkembangan laporan bullying Anda
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Ticket ID */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Ticket className="h-5 w-5 text-blue-600" />
                                    <span>Kode Tiket</span>
                                </div>
                                <input
                                    type="text"
                                    value={data.ticket_id}
                                    onChange={(e) => setData('ticket_id', e.target.value.toUpperCase())}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono tracking-wider"
                                    placeholder="Contoh: SIP-202312-AB1C"
                                    required
                                />
                            </label>
                            {errors.ticket_id && (
                                <p className="text-sm text-red-600 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {errors.ticket_id}
                                </p>
                            )}
                        </div>

                        {/* Access PIN */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Lock className="h-5 w-5 text-blue-600" />
                                    <span>PIN Akses</span>
                                </div>
                                <input
                                    type="text"
                                    value={data.access_pin}
                                    onChange={(e) => setData('access_pin', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-center text-lg"
                                    placeholder="6 digit PIN"
                                    maxLength="6"
                                    required
                                />
                            </label>
                            {errors.access_pin && (
                                <p className="text-sm text-red-600 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {errors.access_pin}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </span>
                            ) : 'Cek Status Laporan'}
                        </button>
                    </form>

                    {/* Info Box */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">
                                    Tidak punya kode tiket?
                                </p>
                                <p className="text-sm text-blue-700">
                                    Kode tiket dan PIN diberikan saat Anda berhasil mengirim laporan.
                                    Jika hilang, hubungi admin secara langsung.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
