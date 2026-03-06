import { Metadata } from 'next';
import Nav from '@/components/nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'JuiceMe | Smart Juice Recipes from Your Fridge',
  description: 'Find the perfect juice recipe based on the ingredients you have or your health goals.',
  keywords: ['juice recipes', 'juicing ingredients', 'healthy drinks', 'fridge search', 'smoothie ideas'],
  
  // Explicitly map the icons to the /public folder
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Points to public/favicon.ico
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }, // Points to public/apple-touch-icon.png
    ],
  },
  manifest: '/site.webmanifest',

  openGraph: {
    title: 'JuiceMe - What\'s in your fridge?',
    description: 'Turn your leftover produce into powerful health boosts.',
    url: 'https://juiceme.app',
    siteName: 'JuiceMe',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JuiceMe',
    description: 'Smart juice recipes based on your ingredients.',
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
        {/* Viewport is now moved out of metadata in newer Next.js versions */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  );
}