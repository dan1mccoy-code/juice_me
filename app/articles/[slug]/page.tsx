import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getRelatedArticles } from '@/content/articles';
import AdUnit from '@/components/AdUnit';
import { supabase } from '@/lib/supabase';

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

  const relatedArticles = getRelatedArticles(article.relatedArticleSlugs);

  // Fetch related recipes from Supabase
  let relatedRecipes: any[] = [];
  if (article.relatedRecipeSlugs.length > 0) {
    const { data } = await supabase
      .from('recipes')
      .select('title, slug, source_type, rating_count, rating_sum, category')
      .in('slug', article.relatedRecipeSlugs);
    relatedRecipes = data ?? [];
  }

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
    <main className="flex flex-col items-center max-w-md md:max-w-2xl mx-auto min-h-screen">
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
      <p className="text-[10px] text-gray-400 text-right w-full px-4 pt-1">
        Photo by{' '}
        <a href={article.heroPhotographer.url} target="_blank" rel="noopener noreferrer"
           className="underline hover:text-gray-600">
          {article.heroPhotographer.name}
        </a>
        {' '}on Unsplash
      </p>

      <div className="w-full px-6 pb-12">
        {/* Header */}
        <div className="mt-6 mb-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">{article.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.hook}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Link key={tag} href={`/articles?tag=${encodeURIComponent(tag)}`} className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full hover:bg-green-100 transition-colors">
                {tag}
              </Link>
            ))}
          </div>
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
            if (section.type === 'recipe') {
              return (
                <Link
                  key={i}
                  href={`/recipe/${section.slug}`}
                  className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-bold text-gray-900 text-sm leading-tight mb-1">{section.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{section.description}</p>
                  </div>
                  <span className="text-green-500 font-bold flex-shrink-0 text-xs uppercase tracking-widest">Recipe →</span>
                </Link>
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

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mt-10 mb-6">
            <h2 className="text-xl font-bold mb-4">Try These Recipes</h2>
            <div className="space-y-3">
              {relatedRecipes.map((r: any) => {
                const avg = r.rating_count > 0 ? (r.rating_sum / r.rating_count).toFixed(1) : '0.0';
                return (
                  <Link key={r.slug} href={`/recipe/${r.slug}`} className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all">
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight mb-1">{r.title}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">⭐</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{avg} ({r.rating_count})</span>
                      </div>
                    </div>
                    <span className="text-gray-300 font-bold flex-shrink-0 ml-4">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Keep Reading</h2>
            <div className="space-y-3">
              {relatedArticles.map(a => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="flex gap-4 items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                    <img src={a.heroImage} alt={a.heroAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{a.title}</p>
                  </div>
                  <span className="text-gray-300 font-bold flex-shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
