import type { Metadata } from 'next';
import Script from 'next/script';
import Nav from '@/components/nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://juiceme.app'),
  title: {
    default: 'JuiceMe | Smart Juice Recipes from Your Fridge',
    template: '%s | JuiceMe',
  },
  description: 'Find the perfect juice recipe based on the ingredients you have or your health goals. 100+ healthy juice recipes sorted by ingredient.',
  keywords: ['juice recipes', 'juicing', 'healthy drinks', 'juice ingredients', 'health boost', 'green juice', 'fruit juice', 'wellness drinks'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JuiceMe - What\'s in your fridge?',
    description: 'Turn your leftover produce into powerful health boosts. Find juice recipes by ingredient.',
    url: 'https://juiceme.app',
    siteName: 'JuiceMe',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-juice.jpg', width: 1200, height: 630, alt: 'JuiceMe - Smart Juice Recipes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JuiceMe - Smart Juice Recipes',
    description: 'Find juice recipes based on what\'s in your fridge.',
    images: ['/og-juice.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PV8EPGJEH1" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PV8EPGJEH1');
        `}</Script>
        <Nav />
        {children}
      </body>
    </html>
  );
}
