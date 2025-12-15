import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gradient-to-br from-[#E3F2FD] to-white">

            <div className="w-full sm:max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                {children}
            </div>
        </div>
    );
}