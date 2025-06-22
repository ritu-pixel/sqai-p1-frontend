'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // if you want to include the navbar here too

export default function DashboardPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      } else {
        console.error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
      } else {
        alert('❌ Failed to delete file.');
      }
    } catch (error) {
      alert('❌ Error deleting file.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      {/* Optional Navbar */}
      <Navbar />

      <div className="relative min-h-screen flex items-start justify-center p-6">
        {/* 🔵 Fullscreen Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/background.png')", // 🔁 Your actual image path
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'darken',
          }}
        />

        {/* 📁 Dashboard Content */}
        <div className="relative z-10 w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
            📁 Uploaded Files
          </h1>

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white shadow-lg"
                >
                  <p className="font-semibold">{file.filename}</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => router.push(`/dashboard/${file.id}`)}
                      className="px-4 py-2 bg-black text-white font-semibold rounded transition hover:shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                    >
                      👁️ View
                    </button>

                    <button
                      onClick={() => handleDelete(file.id)}
                      className="px-4 py-2 bg-red-800 rounded text-white font-semibold transition hover:shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
