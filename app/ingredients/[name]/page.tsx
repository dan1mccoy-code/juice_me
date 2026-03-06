import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const getIngredientData = async (name: string) => {
  // Find ingredient by name (case-insensitive)
  const { data: ingredient } = await supabase
    .from('ingredients')
    .select('id, name')
    .ilike('name', name)
    .single();

  if (!ingredient) return null;

  // Get all recipes that use this ingredient
  const { data: recipeRows } = await supabase
    .from('recipe_ingredients')
    .select('recipes(id, title, slug, source_type, rating_count, rating_sum, category)')
    .eq('ingredient_id', ingredient.id);

  const recipes = (recipeRows ?? [])
    .map((r: any) => {
      const rec = Array.isArray(r.recipes) ? r.recipes[0] : r.recipes;
      return rec;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.rating_count - a.rating_count);

  return { ingredient, recipes };
};

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const display = decoded.charAt(0).toUpperCase() + decoded.slice(1).toLowerCase();

  return {
    title: `${display} Juice Recipes`,
    description: `Find the best juice recipes made with ${display.toLowerCase()}. Browse all JuiceMe recipes that feature ${display.toLowerCase()} as an ingredient.`,
    alternates: { canonical: `/ingredients/${name}` },
    openGraph: {
      title: `${display} Juice Recipes | JuiceMe`,
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
        <h1 className="text-3xl font-black text-gray-900 leading-tight mt-4 mb-2">{display} Juice Recipes</h1>
        <p className="text-gray-500 text-sm">{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} featuring {display.toLowerCase()}</p>
      </div>

      <div className="w-full space-y-4 mb-12">
        {recipes.length > 0 ? recipes.map((recipe: any) => {
          const avg = recipe.rating_count > 0
            ? (recipe.rating_sum / recipe.rating_count).toFixed(1)
            : '0.0';
          return (
            <Link
              key={recipe.slug}
              href={`/recipe/${recipe.slug}`}
              className="block bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-gray-900 leading-tight pr-4">{recipe.title}</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ${recipe.source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
                  {recipe.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
                </span>
              </div>
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
