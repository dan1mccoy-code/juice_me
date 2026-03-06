import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/content/articles';
import AdUnit from '@/components/AdUnit';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/articles/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: article.heroImage, width: 800, alt: article.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.heroImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.heroImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'JuiceMe',
      url: 'https://juiceme.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JuiceMe',
      url: 'https://juiceme.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://juiceme.app/og-juice.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://juiceme.app/articles/${slug}`,
    },
  };

  return (
    <main className="flex flex-col items-center max-w-md mx-auto min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <div className="relative w-full h-56">
        <Image
          src={article.heroImage}
          alt={article.heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
          priority
        />
      </div>

      <div className="w-full px-6 pb-12">
        {/* Header */}
        <div className="mt-6 mb-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">{article.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{article.hook}</p>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {article.sections.map((section, i) => {
            if (section.type === 'h2') {
              return (
                <h2 key={i} className="text-xl font-black text-gray-900 leading-tight pt-2">
                  {section.text}
                </h2>
              );
            }
            if (section.type === 'body') {
              return (
                <p key={i} className="text-gray-600 leading-relaxed text-sm">
                  {section.text}
                </p>
              );
            }
            if (section.type === 'tip') {
              return (
                <div key={i} className="bg-green-50 border border-green-100 rounded-2xl px-5 py-4">
                  <p className="text-green-700 text-sm leading-relaxed font-medium">{section.text}</p>
                </div>
              );
            }
            if (section.type === 'image') {
              return (
                <figure key={i} className="w-full">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                    <Image
                      src={section.src}
                      alt={section.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 448px"
                    />
                  </div>
                  {section.caption && (
                    <figcaption className="text-gray-400 text-xs text-center mt-2 italic">{section.caption}</figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </div>

        {/* Ad Unit */}
        <div className="w-full mt-10 mb-8">
          <AdUnit slot="7195926014" format="fluid" layout="in-article" />
        </div>

        {/* Footer nav */}
        <div className="flex justify-between items-center">
          <Link href="/articles" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors">
            ← All Articles
          </Link>
          <Link href="/ingredients" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors">
            Find a Recipe
          </Link>
        </div>
      </div>
    </main>
  );
}
