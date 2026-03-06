import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for JuiceMe — how we collect and use information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      <div className="w-full mt-8 mb-8">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-xs">Last updated: March 2026</p>
      </div>

      <div className="w-full space-y-6 text-gray-600 text-sm leading-relaxed mb-12">
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Overview</h2>
          <p>JuiceMe ("we", "us", or "our") operates juiceme.app. This page explains what information we collect, how we use it, and your choices.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Information We Collect</h2>
          <p>We do not collect any personally identifiable information directly. When you use the site, the following third-party services may collect data:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Google Analytics</strong> — collects anonymized usage data such as pages visited, session duration, and device type to help us understand how the site is used.</li>
            <li><strong>Google AdSense</strong> — serves ads and may use cookies to personalize ad content based on your browsing history.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Cookies</h2>
          <p>We use cookies through Google Analytics and Google AdSense. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>. You can also opt out of Google Analytics tracking via the <a href="https://tools.google.com/dlpage/gaoptout" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">How We Use Information</h2>
          <p>Usage data is used solely to improve the site experience and understand which content is most useful to visitors. We do not sell data to third parties.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Third-Party Links</h2>
          <p>Articles may contain links to external sites. We are not responsible for the privacy practices of those sites.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Children's Privacy</h2>
          <p>This site is not directed to children under 13. We do not knowingly collect information from children.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Contact</h2>
          <p>Questions about this policy? Email us at <a href="mailto:hello@juiceme.app" className="text-green-600 underline">hello@juiceme.app</a>.</p>
        </section>
      </div>

      <Link href="/" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors mb-8">
        Back to Home
      </Link>
    </main>
  );
}
