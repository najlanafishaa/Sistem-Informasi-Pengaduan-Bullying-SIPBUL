import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { 
    FileText, 
    Search, 
    Shield,
    ArrowRight,
    CheckCircle,
    Clock,
    AlertTriangle
} from 'lucide-react';

export default function Dashboard({ auth }) {
    const quickActions = [
        { name: 'Buat Laporan Baru', description: 'Laporkan insiden bullying', href: route('reports.create'), icon: FileText, color: 'bg-[#1A73E8]' },
        { name: 'Cek Status Laporan', description: 'Lacak perkembangan laporan', href: route('track.form'), icon: Search, color: 'bg-[#0D47A1]' },
    ];

    return (
        <DashboardLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Welcome Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Selamat datang, {auth.user.name}!
                        </h2>
                        <p className="mt-2 text-blue-100">
                            {auth.user.role === 'admin' 
                                ? 'Anda login sebagai. Kelola laporan dengan bijak.'
                                : 'Sistem SIPBUL siap membantu Anda melaporkan insiden bullying.'
                            }
                        </p>
                    </div>
                    <div className="p-4 bg-white/20 rounded-xl">
                        <Shield className="h-12 w-12 text-white" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {quickActions.map((action) => (
                        <a
                            key={action.name}
                            href={action.href}
                            className="card p-6 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className={`p-3 rounded-lg ${action.color} w-fit mb-4`}>
                                        <action.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-[#1A73E8] transition-colors">
                                        {action.name}
                                    </h4>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {action.description}
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1A73E8] transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Recent Activity (Placeholder) */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#E3F2FD] rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white rounded-lg">
                                <FileText className="h-5 w-5 text-[#1A73E8]" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Laporan #SIP-202312-AB1C</p>
                                <p className="text-sm text-gray-600">Status: Dalam Investigasi</p>
                            </div>
                        </div>
                        <span className="badge status-investigation">Investigasi</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Laporan #SIP-202312-XY2Z</p>
                                <p className="text-sm text-gray-600">Status: Selesai</p>
                            </div>
                        </div>
                        <span className="badge status-resolved">Selesai</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
