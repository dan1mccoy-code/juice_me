import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'JuiceMe was built to help you figure out what to grab from the produce section to make a great juice.',
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center p-6 max-w-md md:max-w-2xl mx-auto min-h-screen">

      <div className="w-full mt-8 mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🧃</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">About JuiceMe</h1>
        <p className="text-gray-500 text-sm">Built by juice nerds, for juice nerds.</p>
      </div>

      {/* Mission */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          JuiceMe was born in the produce aisle.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          You know the feeling — you're standing in front of a wall of fruit and vegetables, cart half-full, and you're pretty sure you're one or two ingredients short of something really good. But which ones? And what would you even make?
        </p>
        <p className="text-gray-700 leading-relaxed">
          We built this app to solve exactly that. Tell us what you already have, or tell us how you want to feel, and we'll show you what to grab and how to make it. No more guessing in the aisle. No more buying a bag of kale with no plan.
        </p>
      </div>

      {/* How it works */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-gray-700 leading-relaxed pt-1">Tell us what's already in your cart or fridge.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-gray-700 leading-relaxed pt-1">We match you with recipes you can almost make — and show you exactly what's missing.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-gray-700 leading-relaxed pt-1">Grab the one or two extra items, go home, and juice.</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Have a recipe suggestion, feedback, or just want to talk juice? We'd love to hear from you.
        </p>
        <a
          href="mailto:hello@juiceme.app"
          className="inline-block px-5 py-3 bg-green-50 text-green-700 font-bold rounded-2xl border border-green-100 hover:bg-green-100 transition-colors text-sm"
        >
          hello@juiceme.app
        </a>
        <p className="text-gray-400 text-xs mt-3 italic">* Email not yet active — coming soon.</p>
      </div>

      <Link href="/" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors mb-8">
        Back to Home
      </Link>

    </main>
  );
}
