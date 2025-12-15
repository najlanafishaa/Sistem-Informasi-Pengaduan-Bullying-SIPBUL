import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login SIPBUL" />

            <div className="w-full max-w-md mx-auto p-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-[#E3F2FD]">
                            <Shield className="w-10 h-10 text-[#1A73E8]" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        SIPBUL
                    </h1>
                    <p className="text-gray-600">
                        Sistem Informasi Pengaduan Bullying
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Login menggunakan NPM/NIP Anda
                    </p>
                </div>

                {status && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                        {status}
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Identifier Field */}
                        <div className="space-y-2">
                            <InputLabel 
                                htmlFor="identifier" 
                                value="NPM / NIP"
                                className="text-gray-700 font-medium"
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="identifier"
                                    type="text"
                                    name="identifier"
                                    value={data.identifier}
                                    className="pl-10 w-full py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] transition-all"
                                    placeholder="Masukkan NPM atau NIP"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('identifier', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.identifier} />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <InputLabel 
                                htmlFor="password" 
                                value="Password"
                                className="text-gray-700 font-medium"
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="pl-10 pr-10 w-full py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] transition-all"
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#42A5F5]"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Ingat saya
                                </span>
                            </label>
                            
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-[#1A73E8] hover:text-[#0D47A1] hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] hover:from-[#0D47A1] hover:to-[#1A73E8] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sedang login...
                                </span>
                            ) : (
                                'Masuk'
                            )}
                        </PrimaryButton>
                    </form>

                    {/* Info */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} SIPBUL - Sistem Informasi Pengaduan Bullying
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}