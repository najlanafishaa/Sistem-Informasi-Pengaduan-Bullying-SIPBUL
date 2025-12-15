import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { 
    Search, 
    Filter, 
    Download, 
    Plus, 
    Check, 
    X, 
    Clock, 
    AlertTriangle,
    CheckCircle,
    FileText,
    Eye,
    Users,
    Shield,
    BarChart3,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    MoreVertical
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminReportsIndex({ reports, filters, stats }) {
    const [selectedReports, setSelectedReports] = useState([]);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [bulkAction, setBulkAction] = useState('');
    const [search, setSearch] = useState(filters.search || '');
    
    // FIX: Gunakan state terpisah untuk filter
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(route('admin.reports.index'), {
                search: searchTerm,
                status: statusFilter
            }, {
                preserveState: true,
                replace: true
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter]);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        verified: 'bg-blue-100 text-blue-800',
        investigation: 'bg-purple-100 text-purple-800',
        resolved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const statusIcons = {
        pending: Clock,
        verified: Check,
        investigation: AlertTriangle,
        resolved: CheckCircle,
        rejected: X,
    };

    const categoryLabels = {
        fisik: 'Fisik',
        verbal: 'Verbal',
        cyber: 'Cyber',
        seksual: 'Seksual',
        akademik: 'Akademik',
        lain: 'Lainnya',
    };

    return (
        <DashboardLayout header="Kelola Laporan">
            <Head title="Kelola Laporan" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Laporan</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                
                {/* ... sisa stat cards tetap sama ... */}
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari berdasarkan ID tiket, judul, atau deskripsi..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                        >
                            <option value="">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="verified">Terverifikasi</option>
                            <option value="investigation">Investigasi</option>
                            <option value="resolved">Selesai</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                        
                        <button
                            onClick={() => router.get(route('admin.reports.index'))}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <RefreshCw className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectedReports.length === reports.data.length && reports.data.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedReports(reports.data.map(report => report.id));
                                            } else {
                                                setSelectedReports([]);
                                            }
                                        }}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID Tiket
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Judul
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tanggal
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.data.length > 0 ? (
                                reports.data.map((report) => {
                                    const StatusIcon = statusIcons[report.status] || Clock;
                                    
                                    return (
                                        <tr key={report.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedReports.includes(report.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedReports([...selectedReports, report.id]);
                                                        } else {
                                                            setSelectedReports(selectedReports.filter(id => id !== report.id));
                                                        }
                                                    }}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {report.ticket_id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs">
                                                    <div className="text-sm font-medium text-gray-900 truncate">
                                                        {report.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate">
                                                        {report.description.substring(0, 60)}...
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {categoryLabels[report.category] || report.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                                                    <StatusIcon className="mr-1 h-3 w-3" />
                                                    {report.status === 'pending' ? 'Menunggu' : 
                                                     report.status === 'verified' ? 'Terverifikasi' :
                                                     report.status === 'investigation' ? 'Investigasi' :
                                                     report.status === 'resolved' ? 'Selesai' : 'Ditolak'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(report.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('admin.reports.show', report.id)}
                                                        className="text-[#1A73E8] hover:text-[#0D47A1] p-1"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <FileText className="h-12 w-12 text-gray-400 mb-4" />
                                            <p className="text-gray-500 font-medium">Tidak ada laporan ditemukan</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {searchTerm || statusFilter ? 'Coba dengan filter yang berbeda' : 'Belum ada laporan yang dibuat'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - FIX INI */}
                {reports.data.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Menampilkan <span className="font-medium">{reports.from}</span> sampai{' '}
                                <span className="font-medium">{reports.to}</span> dari{' '}
                                <span className="font-medium">{reports.total}</span> laporan
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                {reports.prev_page_url ? (
                                    <Link
                                        href={reports.prev_page_url}
                                        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </Link>
                                ) : (
                                    <span className="px-3 py-1 text-gray-400 border border-gray-300 rounded cursor-not-allowed flex items-center gap-1">
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </span>
                                )}
                                
                                {/* Page Numbers */}
                                {reports.links.slice(1, -1).map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 rounded ${
                                                link.active
                                                    ? 'bg-[#1A73E8] text-white'
                                                    : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 text-gray-400"
                                        >
                                            {link.label}
                                        </span>
                                    )
                                ))}
                                
                                {/* Next Button */}
                                {reports.next_page_url ? (
                                    <Link
                                        href={reports.next_page_url}
                                        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <span className="px-3 py-1 text-gray-400 border border-gray-300 rounded cursor-not-allowed flex items-center gap-1">
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bulk Actions Panel */}
            {selectedReports.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border p-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedReports.length} laporan terpilih
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setBulkAction('verify');
                                    setShowBulkModal(true);
                                }}
                                className="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200 flex items-center gap-1"
                            >
                                <Check className="h-3 w-3" />
                                Verifikasi
                            </button>
                            <button
                                onClick={() => setSelectedReports([])}
                                className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded flex items-center gap-1"
                            >
                                <X className="h-3 w-3" />
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}