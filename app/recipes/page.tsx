import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'All Juice Recipes',
  description: 'Browse 100+ juice recipes by category — Green, Citrus, Root, Tropical, Wellness, Hydration, and Energy.',
  alternates: { canonical: '/recipes' },
  openGraph: {
    title: 'All Juice Recipes | JuiceMe',
    description: 'Browse 100+ juice recipes by category — Green, Citrus, Root, Tropical, Wellness, Hydration, and Energy.',
    url: '/recipes',
    type: 'website',
  },
};

const CATEGORIES = ['Green', 'Citrus', 'Root', 'Tropical', 'Wellness', 'Hydration', 'Energy'];

const CATEGORY_COLORS: Record<string, string> = {
  Green:     'bg-green-50 text-green-700 border-green-100',
  Citrus:    'bg-yellow-50 text-yellow-700 border-yellow-100',
  Root:      'bg-amber-50 text-amber-700 border-amber-100',
  Tropical:  'bg-teal-50 text-teal-700 border-teal-100',
  Wellness:  'bg-purple-50 text-purple-700 border-purple-100',
  Hydration: 'bg-blue-50 text-blue-600 border-blue-100',
  Energy:    'bg-orange-50 text-orange-700 border-orange-100',
};

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const activeCategory = CATEGORIES.includes(category || '') ? category : undefined;

  let query = supabase
    .from('recipes')
    .select('title, slug, source_type, rating_count, rating_sum, category')
    .order('rating_count', { ascending: false });

  if (activeCategory) {
    query = query.eq('category', activeCategory);
  }

  const { data: recipes } = await query;
  const list = recipes ?? [];

  return (
    <main className="flex flex-col items-center p-6 max-w-5xl mx-auto min-h-screen">
      <div className="w-full mt-8 mb-6">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">Recipes</h1>
        <p className="text-gray-500 text-sm">{list.length} juice recipe{list.length !== 1 ? 's' : ''}{activeCategory ? ` in ${activeCategory}` : ' across all categories'}.</p>
      </div>

      {/* Category filter chips */}
      <div className="w-full flex flex-wrap gap-2 mb-8">
        <Link
          href="/recipes"
          className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${!activeCategory ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}
        >
          All
        </Link>
        {CATEGORIES.map(cat => (
          <Link
            key={cat}
            href={`/recipes?category=${encodeURIComponent(cat)}`}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${activeCategory === cat ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Recipe list */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {list.length > 0 ? list.map((r: any) => {
          const avg = r.rating_count > 0 ? (r.rating_sum / r.rating_count).toFixed(1) : '0.0';
          const catColor = CATEGORY_COLORS[r.category] ?? 'bg-gray-50 text-gray-500 border-gray-100';
          return (
            <Link
              key={r.slug}
              href={`/recipe/${r.slug}`}
              className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
            >
              <div className="flex-1 min-w-0 pr-3">
                <p className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-1">{r.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {r.category && (
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${catColor}`}>
                      {r.category}
                    </span>
                  )}
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${r.source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
                    {r.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">⭐ {avg} ({r.rating_count})</span>
                </div>
              </div>
              {r.rating_count > 5 && (
                <span className="flex-shrink-0 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full tracking-widest uppercase mr-2">
                  HOT
                </span>
              )}
              <span className="text-gray-300 font-bold flex-shrink-0">→</span>
            </Link>
          );
        }) : (
          <p className="text-gray-400 text-sm text-center py-10">No recipes in this category yet.</p>
        )}
      </div>
    </main>
  );
}
