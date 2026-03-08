import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RecipeCard from '@/components/RecipeCard';

const getIngredientData = async (name: string) => {
  const { data: ingredient } = await supabase
    .from('ingredients')
    .select('id, name')
    .ilike('name', name)
    .single();

  if (!ingredient) return null;

  const { data: riRows } = await supabase
    .from('recipe_ingredients')
    .select('recipe_id')
    .eq('ingredient_id', ingredient.id);

  const recipeIds = (riRows ?? []).map((r: any) => r.recipe_id);
  if (recipeIds.length === 0) return { ingredient, recipes: [] };

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

  const heroName = ingredient.name.toLowerCase();

  const shaped = (recipes ?? []).map((r: any) => ({
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    source_type: r.source_type as string,
    rating_count: Number(r.rating_count) || 0,
    rating_sum: Number(r.rating_sum) || 0,
    ingredients: (r.recipe_ingredients as any[])
      ?.map((ri: any) => {
        const ing = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
        return ing?.name as string | undefined;
      })
      .filter((n): n is string => !!n)
      .sort()
      .map(name => ({ name, have: name.toLowerCase() === heroName })) ?? [],
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
    <main className="flex flex-col items-center p-6 max-w-5xl mx-auto min-h-screen">
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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {recipes.length > 0 ? recipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            title={recipe.title}
            slug={recipe.slug}
            source_type={recipe.source_type}
            rating_count={recipe.rating_count}
            rating_sum={recipe.rating_sum}
            ingredients={recipe.ingredients}
          />
        )) : (
          <p className="col-span-3 text-gray-400 text-sm text-center py-10">No recipes found for this ingredient yet.</p>
        )}
      </div>
    </main>
  );
}
