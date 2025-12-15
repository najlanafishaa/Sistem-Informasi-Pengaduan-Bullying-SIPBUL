import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FileText, 
    Search, 
    Shield, 
    Bell, 
    LogOut, 
    Menu, 
    X,
    User,
    Home,
    List,
    BarChart
} from 'lucide-react';

export default function DashboardLayout({ children, header }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;

    // NAVIGASI BERDASARKAN ROLE
    const userNavigation = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutDashboard,
            current: route().current('dashboard'),
        },
        {
            name: 'Buat Laporan',
            href: route('reports.create'),
            icon: FileText,
            current: route().current('reports.create'),
        },
        {
            name: 'Cek Status',
            href: route('track.form'),
            icon: Search,
            current: route().current('track.*'),
        },
    ];

    const adminNavigation = [
        {
            name: 'Kelola Laporan',
            href: route('admin.reports.index'),
            icon: List,
            current: route().current('admin.reports.index'),
        },
       
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={header || 'Dashboard SIPBUL'} />

            {/* Sidebar for Desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-[#1A73E8] to-[#0D47A1] px-6 pb-4">
                    {/* Logo */}
                    <div className="flex h-16 shrink-0 items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="p-2 bg-white rounded-lg">
                                <Shield className="h-8 w-8 text-[#1A73E8]" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">SIPBUL</h1>
                                <p className="text-xs text-blue-100">Sistem Pengaduan</p>
                            </div>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-x-4 p-4 bg-white/10 rounded-xl">
                        <div className="p-2 bg-white rounded-full">
                            <User className="h-6 w-6 text-[#1A73E8]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{auth.user.name}</p>
                            <p className="text-xs text-blue-100">
                                {auth.user.role === 'admin' ? 'Admin' : 'Pengguna'}
                            </p>
                        </div>
                    </div>

                    {/* Navigation - TAMPILKAN BERDASARKAN ROLE */}
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-2">
                            {/* MENU UNTUK USER BIASA */}
                            {auth.user.role === 'user' && (
                                <>
                                    {userNavigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`
                                                    flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium
                                                    ${item.current 
                                                        ? 'bg-white text-[#1A73E8]' 
                                                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                                    }
                                                    transition-all duration-200
                                                `}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}

                            {/* MENU UNTUK ADMIN */}
                            {auth.user.role === 'admin' && (
                                <>
                                    {adminNavigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`
                                                    flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium
                                                    ${item.current 
                                                        ? 'bg-white text-[#1A73E8]' 
                                                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                                    }
                                                    transition-all duration-200
                                                `}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>

                        {/* Logout */}
                        <div className="mt-auto pt-4">
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 w-full"
                            >
                                <LogOut className="h-5 w-5" />
                                Keluar
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-[#1A73E8] to-[#0D47A1] p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <Shield className="h-8 w-8 text-[#1A73E8]" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">SIPBUL</h1>
                                    <p className="text-xs text-blue-100">Sistem Pengaduan</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        {/* Mobile navigation - JUGA BERDASARKAN ROLE */}
                        <nav className="space-y-2">
                            {/* MENU MOBILE UNTUK USER BIASA */}
                            {auth.user.role === 'user' && (
                                <>
                                    {userNavigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </>
                            )}

                            {/* MENU MOBILE UNTUK ADMIN */}
                            {auth.user.role === 'admin' && (
                                <>
                                    {adminNavigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 items-center justify-end gap-x-4">
                        <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-500 relative"
                        >
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                        </button>

                        {/* User profile dropdown */}
                        <div className="flex items-center gap-x-3">
                            <div className="hidden lg:block">
                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {auth.user.role === 'admin' ? 'Admin' : 'Pengguna'}
                                </p>
                            </div>
                            <div className="p-2 bg-[#E3F2FD] rounded-full">
                                <User className="h-6 w-6 text-[#1A73E8]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {header && (
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    Sistem Informasi Pengaduan Bullying - {auth.user.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Pengguna'}
                                </p>
                            </div>
                        )}
                        
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}