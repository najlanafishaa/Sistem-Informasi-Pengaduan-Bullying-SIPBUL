import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { 
    Shield, 
    AlertTriangle, 
    CheckCircle, 
    Clock, 
    FileText,
    Download,
    MessageSquare,
    User,
    Calendar,
    MapPin,
    Tag,
    Eye,
    Send,
    Users,
    Check,
    X,
    Search,
    EyeOff,
    Trash2,
    Edit,
    Printer,
    Share2,
    Copy,
    Bell,
    Flag,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { useState } from 'react';

export default function AdminReportShow({ report }) {
    const [activeTab, setActiveTab] = useState('details');
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showInvestigateModal, setShowInvestigateModal] = useState(false);
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        reason: '',
        investigator_note: '',
        resolution_note: '',
        resolution_type: 'mediation',
        follow_up_required: false,
    });

    // Null check untuk report
    if (!report) {
        return (
            <DashboardLayout header="Laporan Tidak Ditemukan">
                <Head title="Laporan Tidak Ditemukan" />
                <div className="text-center py-20">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Laporan Tidak Ditemukan
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Laporan yang Anda cari tidak ditemukan atau telah dihapus.
                    </p>
                    <Link
                        href={route('admin.reports.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#0D47A1] transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar Laporan
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        verified: 'bg-blue-100 text-blue-800',
        investigation: 'bg-purple-100 text-purple-800',
        resolved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const categoryLabels = {
        fisik: 'Fisik',
        verbal: 'Verbal',
        cyber: 'Cyber Bullying',
        seksual: 'Seksual',
        akademik: 'Akademik',
        lain: 'Lainnya',
    };

    const StatusIcon = {
        pending: Clock,
        verified: CheckCircle,
        investigation: Search,
        resolved: CheckCircle,
        rejected: X,
    }[report.status] || Clock;

    const resolutionTypes = {
        mediation: 'Mediasi',
        punishment: 'Penindakan',
        awareness: 'Edukasi & Kesadaran',
        other: 'Lainnya',
    };

    // HANDLER VERIFY - Route terpisah
    const handleVerify = () => {
        post(route('admin.reports.verify', report.id), {}, {
            onSuccess: () => {
                setShowVerifyModal(false);
                // Refresh halaman setelah 1.5 detik
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Verify error:', errors);
                alert('Gagal memverifikasi laporan: ' + (errors.message || 'Unknown error'));
            },
            preserveScroll: true
        });
    };

    // HANDLER REJECT - Route terpisah
    const handleReject = () => {
        if (!data.reason || data.reason.trim().length < 10) {
            alert('Harap berikan alasan penolakan minimal 10 karakter');
            return;
        }

        post(route('admin.reports.reject', report.id), {
            reason: data.reason
        }, {
            onSuccess: () => {
                setShowRejectModal(false);
                reset();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Reject error:', errors);
                alert('Gagal menolak laporan: ' + (errors.reason || errors.message || 'Unknown error'));
            },
            preserveScroll: true
        });
    };

    // HANDLER INVESTIGATE - Route terpisah
    const handleInvestigate = () => {
        if (!data.investigator_note || data.investigator_note.trim().length < 10) {
            alert('Harap berikan catatan investigasi minimal 10 karakter');
            return;
        }

        post(route('admin.reports.investigate', report.id), {
            investigator_note: data.investigator_note
        }, {
            onSuccess: () => {
                setShowInvestigateModal(false);
                reset();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Investigate error:', errors);
                alert('Gagal memulai investigasi: ' + (errors.investigator_note || errors.message || 'Unknown error'));
            },
            preserveScroll: true
        });
    };

    // HANDLER RESOLVE - Route terpisah
    const handleResolve = () => {
        if (!data.resolution_note || data.resolution_note.trim().length < 20) {
            alert('Harap berikan catatan penyelesaian minimal 20 karakter');
            return;
        }

        post(route('admin.reports.resolve', report.id), {
            resolution_note: data.resolution_note,
            resolution_type: data.resolution_type,
            follow_up_required: data.follow_up_required
        }, {
            onSuccess: () => {
                setShowResolveModal(false);
                reset();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            onError: (errors) => {
                console.error('Resolve error:', errors);
                alert('Gagal menyelesaikan laporan: ' + (errors.resolution_note || errors.message || 'Unknown error'));
            },
            preserveScroll: true
        });
    };

    return (
        <DashboardLayout header="Detail Laporan">
            <Head title={`Laporan #${report.ticket_id}`} />

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Laporan #{report.ticket_id}
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[report.status]}`}>
                                <StatusIcon className="inline h-4 w-4 mr-1" />
                                {report.status === 'pending' ? 'Menunggu' : 
                                 report.status === 'verified' ? 'Terverifikasi' :
                                 report.status === 'investigation' ? 'Investigasi' :
                                 report.status === 'resolved' ? 'Selesai' : 'Ditolak'}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-600">{report.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Dibuat: {new Date(report.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {report.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => setShowVerifyModal(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                    <Check className="h-4 w-4" />
                                    Verifikasi
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                    <X className="h-4 w-4" />
                                    Tolak
                                </button>
                            </>
                        )}
                        
                        {report.status === 'Verifikasi' && (
                            <button
                                onClick={() => setShowInvestigateModal(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Search className="h-4 w-4" />
                                Mulai Investigasi
                            </button>
                        )}
                        
                        {report.status === 'investigation' && (
                            <button
                                onClick={() => setShowResolveModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Selesaikan
                            </button>
                        )}
                        
                        <Link
                            href={route('admin.reports.index')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    activeTab === 'details'
                                        ? 'border-[#1A73E8] text-[#1A73E8]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Detail Laporan
                            </button>
                            <button
                                onClick={() => setActiveTab('evidences')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    activeTab === 'evidences'
                                        ? 'border-[#1A73E8] text-[#1A73E8]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Bukti ({report.evidences?.length || 0})
                            </button>
                            <button
                                onClick={() => setActiveTab('timeline')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    activeTab === 'timeline'
                                        ? 'border-[#1A73E8] text-[#1A73E8]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Timeline
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            {/* Deskripsi */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Deskripsi Kejadian
                                </h3>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                                        {report.description}
                                    </p>
                                </div>
                            </div>

                            {/* Informasi Kejadian */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kejadian</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Tanggal & Waktu Kejadian</p>
                                                <p className="text-gray-900">
                                                    {new Date(report.incident_date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Lokasi Kejadian</p>
                                                <p className="text-gray-900">{report.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Tag className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Kategori</p>
                                                <div className="mt-1">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                        {categoryLabels[report.category] || report.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3">
                                            <Shield className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Status</p>
                                                <div className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[report.status]}`}>
                                                        {report.status === 'pending' ? 'Menunggu' : 
                                                         report.status === 'verified' ? 'Terverifikasi' :
                                                         report.status === 'investigation' ? 'Investigasi' :
                                                         report.status === 'resolved' ? 'Selesai' : 'Ditolak'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Anonimitas Info */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <EyeOff className="h-5 w-5" />
                                    Informasi Anonimitas
                                </h3>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Laporan Anonim</p>
                                        <p className="text-sm">Identitas pelapor tidak tersimpan dalam laporan ini untuk menjaga privasi.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'evidences' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bukti Pendukung</h3>
                            {report.evidences && report.evidences.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {report.evidences.map((evidence) => {
                                        const fileName = evidence.file_path.split('/').pop();
                                        const fileExtension = fileName.split('.').pop().toLowerCase();
                                        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
                                        
                                        return (
                                            <div key={evidence.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#1A73E8] transition-colors">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 bg-gray-100 rounded">
                                                            <FileText className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {fileName}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {evidence.file_type} • {fileExtension.toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('admin.evidences.download', evidence.id)}
                                                        className="flex-1 px-3 py-2 bg-[#1A73E8] text-white text-sm rounded-lg hover:bg-[#0D47A1] transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <Download className="h-3 w-3" />
                                                        Download
                                                    </Link>
                                                    {isImage && (
                                                        <a
                                                            href={`/storage/${evidence.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            Lihat
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium">Tidak ada bukti pendukung</p>
                                    <p className="text-gray-400 text-sm mt-1">Pelapor tidak mengunggah bukti pendukung</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Laporan</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                                        <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                                    </div>
                                    <div className="pb-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-gray-900">Laporan dibuat</p>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                                Sistem
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(report.created_at).toLocaleString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Laporan dengan ID #{report.ticket_id} telah berhasil dibuat melalui sistem.
                                        </p>
                                    </div>
                                </div>
                                
                                {report.status !== 'pending' && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 relative">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                                            <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                                        </div>
                                        <div className="pb-6">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-gray-900">Laporan diverifikasi</p>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    Admin
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(report.updated_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {['investigation', 'resolved'].includes(report.status) && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 relative">
                                            <div className="w-4 h-4 bg-purple-500 rounded-full mt-1"></div>
                                            <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                                        </div>
                                        <div className="pb-6">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-gray-900">Investigasi dimulai</p>
                                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                                                    Tim Investigasi
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(report.updated_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {report.status === 'resolved' && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-gray-900">Laporan diselesaikan</p>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                                    Selesai
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(report.updated_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Action Panel */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tiket</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">ID Tiket</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="font-mono font-medium text-gray-900">{report.ticket_id}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(report.ticket_id);
                                            alert('ID Tiket disalin!');
                                        }}
                                        className="text-gray-400 hover:text-[#1A73E8]"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tanggal Dibuat</p>
                                <p className="text-gray-900">
                                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Terakhir Diupdate</p>
                                <p className="text-gray-900">
                                    {new Date(report.updated_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Prioritas</p>
                                <p className="text-gray-900">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                                        {report.category === 'fisik' || report.category === 'seksual' ? 'Tinggi' : 'Normal'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                        <div className="space-y-2">
                            {report.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => setShowVerifyModal(true)}
                                        className="w-full px-4 py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check className="h-4 w-4" />
                                        Verifikasi Laporan
                                    </button>
                                    <button
                                        onClick={() => setShowRejectModal(true)}
                                        className="w-full px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X className="h-4 w-4" />
                                        Tolak Laporan
                                    </button>
                                </>
                            )}
                            
                            {report.status === 'verified' && (
                                <button
                                    onClick={() => setShowInvestigateModal(true)}
                                    className="w-full px-4 py-2.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Search className="h-4 w-4" />
                                    Mulai Investigasi
                                </button>
                            )}
                            
                            {report.status === 'investigation' && (
                                <button
                                    onClick={() => setShowResolveModal(true)}
                                    className="w-full px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    Selesaikan Laporan
                                </button>
                            )}
                            
                            
                            <Link
                                href={route('admin.reports.index')}
                                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Semua Laporan
                            </Link>
                        </div>
                    </div>

                    {/* Status Progress */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progres Status</h3>
                        <div className="space-y-3">
                            {[
                                { status: 'pending', label: 'Menunggu', color: 'bg-yellow-500' },
                                { status: 'verified', label: 'Terverifikasi', color: 'bg-blue-500' },
                                { status: 'investigation', label: 'Investigasi', color: 'bg-purple-500' },
                                { status: 'resolved', label: 'Selesai', color: 'bg-green-500' },
                            ].map((item, index) => (
                                <div key={item.status}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600">{item.label}</span>
                                        {report.status === item.status && (
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                                                Saat ini
                                            </span>
                                        )}
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${item.color} transition-all duration-500 ${
                                                (report.status === 'pending' && index === 0) ||
                                                (report.status === 'verified' && index <= 1) ||
                                                (report.status === 'investigation' && index <= 2) ||
                                                (report.status === 'resolved' && index <= 3)
                                                    ? 'w-full' : 'w-0'
                                            }`}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {/* Verify Modal */}
            {showVerifyModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Verifikasi Laporan</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin memverifikasi laporan <span className="font-semibold">#{report.ticket_id}</span>? 
                            Laporan akan dipindahkan ke status "Terverifikasi" dan siap untuk proses investigasi.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowVerifyModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleVerify}
                                disabled={processing}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Ya, Verifikasi'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <X className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Tolak Laporan</h3>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alasan Penolakan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                                placeholder="Berikan alasan yang jelas mengapa laporan ini ditolak (minimal 10 karakter)..."
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Karakter: {data.reason.length}/500
                            </p>
                            {errors.reason && (
                                <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={processing || !data.reason || data.reason.trim().length < 10}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Ya, Tolak'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Investigate Modal */}
            {showInvestigateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Search className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Mulai Investigasi</h3>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Catatan Investigasi <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.investigator_note}
                                onChange={(e) => setData('investigator_note', e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                placeholder="Berikan catatan awal untuk investigasi (minimal 10 karakter)..."
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Catatan ini akan ditampilkan sebagai informasi awal untuk tim investigasi.
                            </p>
                            {errors.investigator_note && (
                                <p className="text-red-500 text-sm mt-1">{errors.investigator_note}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowInvestigateModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleInvestigate}
                                disabled={processing || !data.investigator_note || data.investigator_note.trim().length < 10}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Mulai Investigasi'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resolve Modal */}
            {showResolveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Selesaikan Laporan</h3>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipe Penyelesaian <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.resolution_type}
                                    onChange={(e) => setData('resolution_type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="mediation">Mediasi antara pihak terkait</option>
                                    <option value="punishment">Penindakan sesuai aturan kampus</option>
                                    <option value="awareness">Program edukasi dan kesadaran</option>
                                    <option value="other">Solusi lainnya</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Catatan Penyelesaian <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.resolution_note}
                                    onChange={(e) => setData('resolution_note', e.target.value)}
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    placeholder="Jelaskan bagaimana laporan ini diselesaikan, langkah-langkah yang diambil, dan hasil yang dicapai (minimal 20 karakter)..."
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Catatan ini akan menjadi dokumentasi resmi penanganan laporan.
                                </p>
                                {errors.resolution_note && (
                                    <p className="text-red-500 text-sm mt-1">{errors.resolution_note}</p>
                                )}
                            </div>
                            
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="follow_up"
                                    checked={data.follow_up_required}
                                    onChange={(e) => setData('follow_up_required', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                />
                                <div>
                                    <label htmlFor="follow_up" className="text-sm font-medium text-gray-700">
                                        Tindak lanjut diperlukan
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        Centang jika perlu monitoring lebih lanjut setelah laporan diselesaikan.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowResolveModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                disabled={processing}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleResolve}
                                disabled={processing || !data.resolution_note || data.resolution_note.trim().length < 20}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Selesaikan Laporan'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}