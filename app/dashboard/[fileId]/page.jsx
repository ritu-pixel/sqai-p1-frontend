'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ExtractedInvoiceTable from '../../components/ExtractedInvoiceTable';

export default function FileDetailsPage() {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${fileId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch file');

        const data = await res.json();
        setFileData(data);

        // ✅ Automatically extract if not already present
        if (!data.json_data) {
          const extractRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/extract/${fileId}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (extractRes.ok) {
            const extracted = await extractRes.json();
            setFileData((prev) => ({ ...prev, json_data: extracted.json_data }));
            setMessage('✅ Extracted successfully!');
          } else {
            const err = await extractRes.json();
            setMessage(`❌ Extraction failed: ${err.detail || 'Unknown error'}`);
          }
        }
      } catch (err) {
        console.error(err);
        setMessage('❌ Could not load file.');
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

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

        <div className="relative z-10 p-6 md:p-12">
          {loading ? (
            <p className="text-white">Loading file...</p>
          ) : (
            <>
              {message && (
                <p className="text-white text-center text-sm mb-4">{message}</p>
              )}

              {/* 📋 Table Section Only */}
              <div className="w-full max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-y-auto">
                {fileData?.json_data ? (
                  <ExtractedInvoiceTable data={fileData.json_data} />
                ) : (
                  <p className="text-white text-center">No extracted data available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
