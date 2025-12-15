import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    FileText, 
    AlertTriangle, 
    Upload, 
    Calendar, 
    MapPin,
    Tag,
    X,
    Shield,
    EyeOff,
    Lock
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function CreateReport() {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        description: '',
        location: '',
        incident_date: '',
        evidences: [],
    });

    const categories = [
        { value: 'fisik', label: 'Fisik', description: 'Kekerasan fisik seperti memukul, mendorong, atau melukai' },
        { value: 'verbal', label: 'Verbal', description: 'Kata-kata kasar, penghinaan, ancaman, atau pelecehan verbal' },
        { value: 'cyber', label: 'Cyber Bullying', description: 'Bullying melalui media sosial, chat, atau platform digital' },
        { value: 'seksual', label: 'Seksual', description: 'Pelemparan, sentuhan tidak diinginkan, atau komentar seksual' },
        { value: 'akademik', label: 'Akademik', description: 'Tindakan yang menghambat proses belajar seperti sabotase tugas' },
        { value: 'lain', label: 'Lainnya', description: 'Bentuk bullying lainnya yang tidak termasuk kategori di atas' },
    ];

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        // Filter duplikat
        const newFiles = selectedFiles.filter(newFile => 
            !files.some(existingFile => 
                existingFile.name === newFile.name && 
                existingFile.size === newFile.size
            )
        );
        
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        setData('evidences', updatedFiles);
    };

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        setData('evidences', newFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange({ target: { files: e.dataTransfer.files } });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Buat FormData untuk upload file
        const formData = new FormData();
        
        // Tambahkan semua field text
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('incident_date', data.incident_date);
        
        // Tambahkan semua file
        files.forEach((file, index) => {
            formData.append(`evidences[${index}]`, file);
        });
        
        // Kirim dengan FormData
        post(route('reports.store'), {
            data: formData,
            forceFormData: true,
            preserveState: false,
        });
    };

    return (
        <DashboardLayout header="Buat Laporan Baru">
            <Head title="Buat Laporan Bullying" />

            <div className="max-w-4xl mx-auto">

                {/* Anonymity Notice */}
                <div className="bg-gradient-to-r from-[#E3F2FD] to-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <EyeOff className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Laporan 100% Anonim
                            </h3>
                            <p className="text-gray-600 mb-3">
                                Identitas Anda tidak akan disimpan atau ditampilkan dalam laporan ini. 
                                Sistem hanya akan menyimpan kode tiket dan PIN untuk melacak perkembangan.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Lock className="h-4 w-4" />
                                <span>Data login Anda aman dan terpisah dari laporan</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">

                    {/* Incident Details */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Detail Kejadian
                        </h2>
                        
                        <div className="space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Judul Laporan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                                    placeholder="Contoh: Pelecehan verbal di ruang kelas"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori Bullying <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {categories.map((category) => (
                                        <label
                                            key={category.value}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                data.category === category.value
                                                    ? 'border-[#1A73E8] bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category.value}
                                                    checked={data.category === category.value}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="mt-0.5"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{category.label}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi Lengkap <span className="text-red-500">*</span>
                                    <span className="text-gray-400 font-normal ml-2">(minimal 50 karakter)</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="6"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] resize-none"
                                    placeholder="Jelaskan kejadian secara detail..."
                                    required
                                    minLength="50"
                                />
                                <div className="flex justify-between mt-2">
                                    <p className="text-sm text-gray-500">
                                        Karakter: {data.description.length}/1000
                                    </p>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location & Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Lokasi Kejadian <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                                        placeholder="Contoh: Ruang kelas 301, Laboratorium, Perpustakaan"
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Tanggal & Waktu Kejadian <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.incident_date}
                                        onChange={(e) => setData('incident_date', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                                        required
                                    />
                                    {errors.incident_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.incident_date}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Evidence Upload */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Bukti Pendukung (Opsional)
                        </h2>
                        
                        <div className="space-y-4">
                            <div 
                                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#1A73E8] transition-colors"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">
                                    <span className="text-[#1A73E8] hover:text-[#0D47A1] cursor-pointer font-medium">
                                        Klik untuk mengunggah
                                    </span>{' '}
                                    atau drag & drop file di sini
                                </p>
                                <p className="text-sm text-gray-500">
                                    Maks. 5MB per file (JPG, PNG, PDF, DOC)
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                />
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium text-gray-700">
                                        File terpilih ({files.length})
                                    </p>
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                                title="Hapus file"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-gradient-to-r from-[#E3F2FD] to-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Perlindungan Privasi
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                        <span>Identitas Anda tidak akan dibagikan kepada siapa pun</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                        <span>Laporan hanya dapat diakses oleh admin terverifikasi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                                        <span>Semua komunikasi dilakukan melalui sistem dengan anonimitas terjaga</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Mengirim Laporan...
                                </>
                            ) : (
                                <>
                                    <FileText className="h-5 w-5" />
                                    Kirim Laporan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}