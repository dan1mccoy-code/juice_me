import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/content/articles';

export const metadata: Metadata = {
  title: 'Juicing Articles & Tips',
  description: 'Juicing guides, ingredient tips, and recipe ideas to help you get more out of your juicer.',
  alternates: { canonical: '/articles' },
  openGraph: {
    title: 'Juicing Articles & Tips | JuiceMe',
    description: 'Juicing guides, ingredient tips, and recipe ideas to help you get more out of your juicer.',
    url: '/articles',
    type: 'website',
  },
};

export default function ArticlesPage() {
  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      <div className="w-full mt-8 mb-8">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">Articles</h1>
        <p className="text-gray-500 text-sm">Tips, guides, and ideas to help you juice better.</p>
      </div>

      <div className="w-full space-y-6 mb-12">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:border-green-200 active:scale-[0.98] transition-all"
          >
            <div className="relative w-full h-48">
              <Image
                src={article.heroImage}
                alt={article.heroAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h2 className="font-black text-gray-900 text-lg leading-tight mb-2">{article.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{article.hook}</p>
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mt-4">Read more →</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
