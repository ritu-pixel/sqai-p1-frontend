'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExtractedInvoiceTable from '../components/ExtractedInvoiceTable';
import Navbar from '../components/Navbar';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    setResultData(null);
    setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ You must be logged in to upload files.');
      router.push('/login');
      return;
    }

    if (!file) return alert('Please select a file!');
    setLoading(true);
    setMessage('');

    try {
      // 🔍 Check if file already exists
      const existingFilesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!existingFilesRes.ok) {
        throw new Error('Failed to fetch existing files.');
      }

      const existingFiles = await existingFilesRes.json();

      const duplicate = existingFiles.find(
        (f) => f.filename.toLowerCase() === file.name.toLowerCase()
      );

      if (duplicate) {
        setMessage('⚠️ File already exists in your dashboard!');
        setLoading(false);
        return;
      }

      // 🟢 Proceed with Upload
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        setMessage('❌ Upload failed!');
        setLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();
      const fileId = uploadData.file_id || uploadData.id;

      const extractRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/extract/${fileId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (extractRes.ok) {
        const result = await extractRes.json();
        setResultData(result);
        setMessage('✅ Upload & Extraction successful!');
      } else {
        const error = await extractRes.json();
        setMessage(`❌ Extraction failed: ${error.detail || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error uploading or extracting!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* 🔵 Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'darken',
          }}
        />

        {/* 🧊 Upload Card */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-10 space-y-6 transition-all duration-300 transform hover:scale-[1.01]">
            <h1 className="text-3xl font-semibold text-white text-center flex items-center justify-center gap-2">
              📁 Upload Invoice
            </h1>

            {!isLoggedIn && (
              <p className="text-yellow-300 text-sm text-center">
                ⚠️ Please{' '}
                <span className="underline cursor-pointer" onClick={() => router.push('/login')}>
                  log in
                </span>{' '}
                to upload files.
              </p>
            )}

            <label className="block border-2 border-dashed border-white/30 rounded-xl px-6 py-10 text-white/80 text-base cursor-pointer hover:border-blue-500 transition text-center">
              <input
                type="file"
                accept=".jpg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
              {file ? file.name : 'Click to choose a .jpg or .png invoice'}
            </label>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Uploading...' : '🚀 Upload'}
              </button>

              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                    setResultData(null);
                    setMessage('');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Clear File
                </button>
              )}
            </div>

            {message && (
              <p className="text-sm font-medium text-white text-center">
                {message}
              </p>
            )}
          </div>

          {/* ✅ Full-Width Result Layout */}
          {resultData?.json_data && (
            <div className="w-full h-[80vh] mt-12 px-6 md:px-12 flex flex-col md:flex-row gap-8 items-start justify-center">
              {/* 🖼️ Preview */}
              <div className="w-full md:w-1/2 h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* 📋 Table */}
              <div className="w-full md:w-1/2 h-full p-6 rounded-xl shadow-xl overflow-y-auto">
                <ExtractedInvoiceTable data={resultData.json_data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
