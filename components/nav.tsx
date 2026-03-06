"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="text-2xl group-hover:scale-110 transition-transform">🧃</span>
          <span className="font-black text-xl tracking-tighter text-green-600">
            JUICE<span className="text-gray-900">ME</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/articles" className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors">
            Articles
          </Link>
          <Link href="/about" className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors">
            About
          </Link>
          {!isHomePage && (
            <Link href="/ingredients" className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors">
              Start Over
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-500 transition-transform duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-500 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-500 transition-transform duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          <Link href="/articles" className="text-xs font-bold text-gray-500 hover:text-green-500 uppercase tracking-widest transition-colors" onClick={() => setOpen(false)}>
            Articles
          </Link>
          <Link href="/about" className="text-xs font-bold text-gray-500 hover:text-green-500 uppercase tracking-widest transition-colors" onClick={() => setOpen(false)}>
            About
          </Link>
          {!isHomePage && (
            <Link href="/ingredients" className="text-xs font-bold text-gray-500 hover:text-green-500 uppercase tracking-widest transition-colors" onClick={() => setOpen(false)}>
              Start Over
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}