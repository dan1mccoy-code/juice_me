import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';

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

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const activeCategory = CATEGORIES.includes(category || '') ? category : undefined;

  let query = supabase
    .from('recipes')
    .select(`
      title, slug, source_type, rating_count, rating_sum, category,
      recipe_ingredients(
        ingredients(name)
      )
    `)
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

      {/* Recipe grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {list.length > 0 ? list.map((r: any) => {
          const ingredients = (r.recipe_ingredients as any[] ?? [])
            .map((ri: any) => {
              const ing = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
              return ing?.name as string | undefined;
            })
            .filter((n): n is string => !!n)
            .sort()
            .map(name => ({ name }));

          return (
            <RecipeCard
              key={r.slug}
              title={r.title}
              slug={r.slug}
              source_type={r.source_type}
              rating_count={r.rating_count}
              rating_sum={r.rating_sum}
              ingredients={ingredients}
            />
          );
        }) : (
          <p className="col-span-3 text-gray-400 text-sm text-center py-10">No recipes in this category yet.</p>
        )}
      </div>
    </main>
  );
}
