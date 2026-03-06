import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const getIngredientData = async (name: string) => {
  // 1. Find ingredient by name (case-insensitive)
  const { data: ingredient } = await supabase
    .from('ingredients')
    .select('id, name')
    .ilike('name', name)
    .single();

  if (!ingredient) return null;

  // 2. Get IDs of recipes that use this ingredient
  const { data: riRows } = await supabase
    .from('recipe_ingredients')
    .select('recipe_id')
    .eq('ingredient_id', ingredient.id);

  const recipeIds = (riRows ?? []).map((r: any) => r.recipe_id);
  if (recipeIds.length === 0) return { ingredient, recipes: [] };

  // 3. Fetch full recipe data + all their ingredients in one query
  const { data: recipes } = await supabase
    .from('recipes')
    .select(`
      id, title, slug, source_type, rating_count, rating_sum, category,
      recipe_ingredients(
        ingredients(name)
      )
    `)
    .in('id', recipeIds)
    .order('rating_count', { ascending: false });

  const shaped = (recipes ?? []).map((r: any) => ({
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    source_type: r.source_type as string,
    rating_count: Number(r.rating_count) || 0,
    rating_sum: Number(r.rating_sum) || 0,
    category: r.category as string,
    otherIngredients: (r.recipe_ingredients as any[])
      ?.map((ri: any) => {
        const ing = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
        return ing?.name as string | undefined;
      })
      .filter((n): n is string => !!n && n.toLowerCase() !== ingredient.name.toLowerCase())
      .sort() ?? [],
  }));

  return { ingredient, recipes: shaped };
};

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const display = decoded.charAt(0).toUpperCase() + decoded.slice(1).toLowerCase();

  return {
    title: `Juice Recipes With ${display}`,
    description: `Find the best juice recipes made with ${display.toLowerCase()}. Browse all JuiceMe recipes that feature ${display.toLowerCase()} as an ingredient.`,
    alternates: { canonical: `/ingredients/${name}` },
    openGraph: {
      title: `Juice Recipes With ${display} | JuiceMe`,
      description: `Find the best juice recipes made with ${display.toLowerCase()}.`,
      url: `/ingredients/${name}`,
    },
  };
}

export default async function IngredientPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const result = await getIngredientData(decoded);
  if (!result) notFound();

  const { ingredient, recipes } = result;
  const display = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);

  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      <div className="w-full mt-8 mb-8">
        <Link href="/ingredients" className="text-xs font-bold text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors">
          ← All Ingredients
        </Link>
        <h1 className="text-3xl font-black text-gray-900 leading-tight mt-4 mb-3">
          Juice Recipes With {display}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Here&apos;s {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} that use {display.toLowerCase()} we know you&apos;ll love.{' '}
          <Link href="/" className="text-green-600 font-semibold hover:underline">
            Tell us what else you have
          </Link>
          , and we&apos;ll give you more ideas.
        </p>
      </div>

      <div className="w-full space-y-4 mb-12">
        {recipes.length > 0 ? recipes.map((recipe) => {
          const avg = recipe.rating_count > 0
            ? (recipe.rating_sum / recipe.rating_count).toFixed(1)
            : '0.0';
          return (
            <Link
              key={recipe.slug}
              href={`/recipe/${recipe.slug}`}
              className="block bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="font-bold text-gray-900 leading-tight pr-4">{recipe.title}</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ${recipe.source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
                  {recipe.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
                </span>
              </div>

              {/* Other ingredient chips */}
              {recipe.otherIngredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {display}
                  </span>
                  {recipe.otherIngredients.map(ing => (
                    <span key={ing} className="text-[9px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium capitalize">{recipe.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">⭐</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {avg} ({recipe.rating_count})
                  </span>
                </div>
              </div>
            </Link>
          );
        }) : (
          <p className="text-gray-400 text-sm text-center py-10">No recipes found for this ingredient yet.</p>
        )}
      </div>
    </main>
  );
}
