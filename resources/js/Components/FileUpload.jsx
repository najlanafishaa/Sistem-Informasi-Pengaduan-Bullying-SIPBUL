import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Upload, X, File, Image as ImageIcon, Video, FileText, Music, Loader } from 'lucide-react';

export default function FileUpload({ reportId, onUploadComplete }) {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [descriptions, setDescriptions] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    
    const { post, errors } = useForm();

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        // Filter files yang sudah ada
        const newFiles = selectedFiles.filter(newFile => 
            !files.some(existingFile => 
                existingFile.name === newFile.name && 
                existingFile.size === newFile.size
            )
        );
        
        // Limit to 10 files total
        if (files.length + newFiles.length > 10) {
            alert('Maksimal 10 file yang dapat diupload');
            return;
        }
        
        setFiles([...files, ...newFiles]);
        
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleDescriptionChange = (index, value) => {
        setDescriptions({
            ...descriptions,
            [index]: value
        });
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setIsUploading(true);
        
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
            if (descriptions[index]) {
                formData.append(`descriptions[${index}]`, descriptions[index]);
            }
        });

        try {
            await post(route('reports.evidences.store', reportId), formData, {
                onSuccess: () => {
                    setFiles([]);
                    setDescriptions({});
                    if (onUploadComplete) {
                        onUploadComplete();
                    }
                },
                preserveScroll: true,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const getFileIcon = (file) => {
        const type = file.type.split('/')[0];
        switch (type) {
            case 'image': return ImageIcon;
            case 'video': return Video;
            case 'audio': return Music;
            default: return FileText;
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {/* File Input Area */}
            <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isUploading ? 'bg-gray-50 border-gray-300' : 'hover:border-[#1A73E8] hover:bg-blue-50 border-gray-300'}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.wmv,.pdf,.doc,.docx,.txt,.mp3,.wav"
                    disabled={isUploading}
                />
                
                <Upload className={`h-12 w-12 mx-auto ${isUploading ? 'text-gray-400' : 'text-gray-400'}`} />
                
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">
                        {isUploading ? 'Mengupload...' : 'Klik untuk memilih file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Drag & drop atau klik untuk upload bukti
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Support: JPG, PNG, GIF, MP4, PDF, DOC, TXT, MP3 (Maks. 20MB per file)
                    </p>
                </div>
            </div>

            {/* Selected Files Preview */}
            {files.length > 0 && (
                <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">
                        File Terpilih ({files.length}/10)
                    </h4>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {files.map((file, index) => {
                            const FileIcon = getFileIcon(file);
                            const fileSize = formatFileSize(file.size);
                            
                            return (
                                <div key={index} className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <FileIcon className="h-5 w-5 text-gray-400" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {fileSize} • {file.type}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-gray-400 hover:text-red-500"
                                            disabled={isUploading}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={descriptions[index] || ''}
                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                            placeholder="Tambahkan deskripsi (opsional)"
                                            className="w-full text-sm border border-gray-300 rounded px-3 py-1"
                                            disabled={isUploading}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Upload Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors
                                ${isUploading 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-[#1A73E8] hover:bg-[#0D47A1] text-white'}`}
                        >
                            {isUploading ? (
                                <>
                                    <Loader className="h-4 w-4 animate-spin" />
                                    Mengupload {files.length} file...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-4 w-4" />
                                    Upload {files.length} File
                                </>
                            )}
                        </button>
                        
                        {errors.files && (
                            <p className="text-red-500 text-sm mt-2">{errors.files}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}