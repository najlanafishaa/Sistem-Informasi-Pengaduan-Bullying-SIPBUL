import React from 'react';

export default function ApplicationLogo({ className }) {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SIP</span>
            </div>
            <span className="font-bold text-gray-900 text-xl">SIPBUL</span>
        </div>
    );
}