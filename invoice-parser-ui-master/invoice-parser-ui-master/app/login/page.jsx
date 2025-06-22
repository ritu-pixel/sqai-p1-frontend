'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => router.push('/upload'), 1000);
      } else {
        setError(data.detail || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔵 Fullscreen Background Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* 🔵 Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'darken',
          }}
        />

        {/* 🔷 Frosted Glass Login Box */}
        <div className="relative z-10 w-full max-w-xl mx-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-8 py-8 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Welcome Back</h2>
            <p className="text-white/70 text-sm">Sign in to continue to your account</p>
          </div>

          {/* ✅ Error/Success */}
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent border-0 border-b-2 border-white/20 focus:border-blue-400 text-white placeholder-white/50 py-4 px-0 outline-none transition-all duration-300 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-transparent border-2 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white/80 text-sm">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl py-4 mt-8 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-10 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
