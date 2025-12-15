import { Head, Link } from '@inertiajs/react';
import { Shield, AlertTriangle, Users, FileText } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SIPBUL - Sistem Informasi Pengaduan Bullying" />
            
            <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#1A73E8] rounded-lg">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">SIPBUL</h1>
                                    <p className="text-sm text-gray-600">Sistem Informasi Pengaduan Bullying</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-2 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-2 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Selamat Datang di
                                <span className="block text-[#1A73E8] mt-2">
                                    SIPBUL
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                                Sistem Informasi Pengaduan Bullying untuk menciptakan lingkungan 
                                kampus yang aman dan nyaman bagi seluruh civitas akademika.
                            </p>
                            <div className="flex justify-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-8 py-4 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                                    >
                                        Ke Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                                    >
                                        Login Sekarang
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Fitur Utama SIPBUL
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Sistem kami dirancang untuk memberikan perlindungan maksimal 
                                dengan menjaga privasi pelapor
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gradient-to-b from-[#E3F2FD] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-[#1A73E8] rounded-lg w-fit mb-6">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Kerahasiaan Terverifikasi
                                </h3>
                                <p className="text-gray-600">
                                    Login dengan identitas, lapor dengan anonim. Identitas Anda 
                                    tidak tersimpan dalam laporan.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gradient-to-b from-[#E3F2FD] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-[#0D47A1] rounded-lg w-fit mb-6">
                                    <AlertTriangle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Sistem Tiket
                                </h3>
                                <p className="text-gray-600">
                                    Setiap laporan mendapatkan kode unik untuk melacak 
                                    perkembangan penanganan.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gradient-to-b from-[#E3F2FD] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-[#42A5F5] rounded-lg w-fit mb-6">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Tim Responsif
                                </h3>
                                <p className="text-gray-600">
                                    Tim khusus akan menangani setiap laporan dengan 
                                    serius dan profesional.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-gradient-to-b from-[#E3F2FD] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="p-3 bg-[#1A73E8] rounded-lg w-fit mb-6">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Bukti Digital
                                </h3>
                                <p className="text-gray-600">
                                    Unggah bukti pendukung untuk memperkuat laporan 
                                    Anda dengan aman dan rahasia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Jangan diam! Laporkan setiap tindakan bullying yang Anda 
                            alami atau saksikan. Bersama kita ciptakan lingkungan 
                            kampus yang bebas dari bullying.
                        </p>
               {auth.user && (
                <Link
                 href={route('reports.create')}
                className="inline-block px-10 py-4 bg-white text-[#1A73E8] font-bold rounded-xl hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
    >
                 Buat Laporan
                     </Link>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-600">
                                © {new Date().getFullYear()} SIPBUL - Sistem Informasi Pengaduan Bullying
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Jurusan Teknik Elektro
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}