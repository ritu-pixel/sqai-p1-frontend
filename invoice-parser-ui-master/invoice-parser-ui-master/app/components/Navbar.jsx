'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsAuthChecked(true);
  }, [pathname]);

  const go = (path) => () => router.push(path);

  const navButton =
    'text-sm px-4 py-1.5 font-medium text-white hover:text-blue-400 transition';

  if (!isAuthChecked) return null;

  const isFileDetailPage = pathname.startsWith('/dashboard/') && pathname !== '/dashboard';

  return (
    <nav className="flex justify-center px-4 py-4 sticky top-4 z-50">
      <div className="flex items-center flex-wrap justify-center gap-x-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md px-6 py-2">
        <h1
          onClick={go('/')}
          className="text-white font-bold text-lg cursor-pointer"
        >
          AI Invoice Parser
        </h1>

        {/* ✅ Special case: [fileId] route */}
        {isFileDetailPage ? (
          <>
            <button onClick={go('/')} className={navButton}>
              Home
            </button>
            <button onClick={go('/dashboard')} className={navButton}>
              Dashboard
            </button>
            <button onClick={go('/upload')} className={navButton}>
              Upload
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                router.push('/login');
              }}
              className="text-sm px-4 py-1.5 font-medium text-red-400 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Other navigation conditions remain the same */}
            {pathname === '/' && (
              <>
                <button
                  onClick={() =>
                    document
                      .getElementById('features')
                      ?.scrollIntoView({ behavior: 'smooth' })}
                  className={navButton}
                >
                  Features
                </button>

                {isLoggedIn ? (
                  <>
                    <button onClick={go('/dashboard')} className={navButton}>
                      Dashboard
                    </button>
                    <button onClick={go('/upload')} className={navButton}>
                      Upload
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={go('/login')} className={navButton}>
                      Login
                    </button>
                    <button onClick={go('/register')} className={navButton}>
                      Register
                    </button>
                  </>
                )}

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      setIsLoggedIn(false);
                      router.push('/login');
                    }}
                    className="text-sm px-4 py-1.5 font-medium text-red-400 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                )}
              </>
            )}

            {(pathname === '/login' || pathname === '/register') && (
              <>
                <button onClick={go('/')} className={navButton}>
                  Home
                </button>
                <button
                  onClick={go(pathname === '/login' ? '/register' : '/login')}
                  className={navButton}
                >
                  {pathname === '/login' ? 'Register' : 'Login'}
                </button>
              </>
            )}

            {(pathname === '/upload' || pathname === '/dashboard') && (
              <>
                <button onClick={go('/')} className={navButton}>
                  Home
                </button>
                <button
                  onClick={go(pathname === '/upload' ? '/dashboard' : '/upload')}
                  className={navButton}
                >
                  {pathname === '/upload' ? 'Dashboard' : 'Upload'}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    router.push('/login');
                  }}
                  className="text-sm px-4 py-1.5 font-medium text-red-400 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
