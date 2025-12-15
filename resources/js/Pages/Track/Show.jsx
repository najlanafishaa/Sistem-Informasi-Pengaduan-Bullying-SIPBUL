import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    FileText, 
    Calendar, 
    MapPin, 
    Shield,
    CheckCircle,
    Clock,
    AlertTriangle,
    XCircle,
    Eye
} from 'lucide-react';

export default function TrackShow({ report }) {
    const getStatusIcon = () => {
        switch(report.status) {
            case 'resolved': return CheckCircle;
            case 'verified': return Shield;
            case 'investigation': return Eye;
            case 'rejected': return XCircle;
            default: return Clock;
        }
    };

    const getStatusColor = () => {
        switch(report.status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'verified': return 'bg-blue-100 text-blue-800';
            case 'investigation': return 'bg-purple-100 text-purple-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = () => {
        switch(report.status) {
            case 'pending': return 'Menunggu Verifikasi';
            case 'verified': return 'Terverifikasi';
            case 'investigation': return 'Dalam Investigasi';
            case 'resolved': return 'Selesai';
            case 'rejected': return 'Ditolak';
            default: return report.status;
        }
    };

    const StatusIcon = getStatusIcon();

    return (
        <DashboardLayout header="Detail Laporan">
            <Head title="Detail Laporan - SIPBUL" />

            <div className="max-w-3xl mx-auto">
                {/* Header dengan Status */}
                <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {report.title}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Tiket: <span className="font-mono font-bold text-blue-700">{report.ticket_id}</span>
                            </p>
                        </div>
                        <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor()}`}>
                            <StatusIcon className="h-5 w-5" />
                            <span className="font-medium">{getStatusLabel()}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Tanggal Lapor</p>
                                <p className="font-medium">
                                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Tanggal Kejadian</p>
                                <p className="font-medium">
                                    {new Date(report.incident_date).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600">Lokasi</p>
                                <p className="font-medium">{report.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kategori */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Kategori</h3>
                    </div>
                    <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg inline-block">
                        <span className="font-medium text-blue-800">
                            {report.category === 'fisik' ? 'Fisik' : 
                             report.category === 'verbal' ? 'Verbal' : 
                             report.category === 'cyber' ? 'Cyber Bullying' : 
                             report.category === 'seksual' ? 'Seksual' : 
                             report.category === 'akademik' ? 'Akademik' : 'Lainnya'}
                        </span>
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Deskripsi Kronologi</h3>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
                    </div>
                </div>

                {/* Admin Note (jika ada) */}
                {report.admin_note && (
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-3">
                            <Shield className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-gray-900">Catatan dari Admin</h3>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                            <p className="text-green-800 whitespace-pre-line">{report.admin_note}</p>
                            <p className="text-sm text-green-600 mt-3">
                                Terakhir diperbarui: {new Date(report.updated_at).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Link
                        href={route('track.form')}
                        className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                        Cek Laporan Lain
                    </Link>
                    <Link
                        href={route('dashboard')}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:shadow-lg transition-all text-center"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>

                {/* Privacy Notice */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">
                                Kerahasiaan Terverifikasi
                            </p>
                            <p className="text-sm text-blue-700">
                                Identitas Anda sebagai pelapor tetap anonim. Tim satgas hanya melihat 
                                isi laporan tanpa mengetahui siapa pelapornya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}