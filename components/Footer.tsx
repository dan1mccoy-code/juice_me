import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-md mx-auto px-6 py-5 flex items-center justify-between">
        <p className="text-gray-400 text-[10px]">© {new Date().getFullYear()} JuiceMe</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-gray-400 text-[10px] hover:text-green-500 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/about" className="text-gray-400 text-[10px] hover:text-green-500 transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
