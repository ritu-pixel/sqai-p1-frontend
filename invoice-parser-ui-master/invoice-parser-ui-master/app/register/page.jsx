'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register?user_name=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        setSuccess('User registered successfully!');
        setError('');
        setTimeout(() => router.push('/login'), 1000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔵 Background & Form Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Fullscreen Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'darken',
          }}
        />

        {/* 🧊 Register Form */}
        <div className="relative z-10 w-full max-w-lg mx-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-12 py-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Create Account</h2>
            <p className="text-white/70 text-sm">Join us today and get started</p>
          </div>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your secure password"
                required
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl py-4 mt-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-10 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
