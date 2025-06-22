'use client';

import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Features from './components/Features';
import { ArrowRight } from 'lucide-react';
import Footer from './components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative text-white overflow-hidden">
      {/* 🔵 Background Image */}
      <div
        className="absolute top-0 left-0 w-full min-h-[120vh] bg-cover bg-center bg-no-repeat bg-black -z-10"
        style={{ backgroundImage: "url('/images/background.png')" }}
      />

      {/* 🔷 Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen px-6 md:px-16">
          <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl w-full mx-auto">
            {/* Left Text Content */}
            <div className="text-center lg:text-left lg:w-1/2">
              <button
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full mb-6 shadow-md transition-all duration-300 flex items-center gap-2"
              >
                Try Now <ArrowRight className="w-4 h-4" />
              </button>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                Welcome to <br />
                <span className="bg-blue-600 text-transparent bg-clip-text">
                  AI Invoice Parser
                </span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-6">
                Extract structured data from invoices, bills, and transport documents using AI.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start">
                <button
                  onClick={() => router.push('/login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => router.push('/upload')}
                  className="bg-white text-blue-700 font-semibold border border-blue-700 py-3 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-md ml-0 sm:ml-4 mt-4 sm:mt-0"
                >
                  Upload Document
                </button>
              </div>
            </div>

            {/* Right Video Content */}
            <div className="lg:w-[60%] w-full">
              <video
                src="/images/demovideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </section>
        </div>

        {/* Features Section */}
        <Features />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
