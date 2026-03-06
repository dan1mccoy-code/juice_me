"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🧃</span>
          <span className="font-black text-xl tracking-tighter text-green-600">
            JUICE<span className="text-gray-900">ME</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/articles"
            className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors"
          >
            About
          </Link>
          {!isHomePage && (
            <Link
              href="/ingredients"
              className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors"
            >
              Start Over
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}