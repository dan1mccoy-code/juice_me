"use client";

import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import StarRating from '@/components/StarRating';

interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  source_type: string;
  rating_count: number;
  rating_sum: number;
  ingredients: {
    name: string;
    quantity_display: string;
  }[];
}

const GET_RECIPE_TAGS = (ingredients: string[]) => {
  const boostMap = [
    { name: 'Immunity', icon: '🛡️', trigger: 'Turmeric', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { name: 'Energy', icon: '⚡', trigger: 'Ginger', color: 'bg-orange-50 text-orange-700 border-orange-100' },
    { name: 'Digestion', icon: '🌿', trigger: 'Mint', color: 'bg-green-50 text-green-700 border-green-100' },
    { name: 'Focus', icon: '🧠', trigger: 'Lemon', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
    { name: 'Hydration', icon: '💧', trigger: 'Cucumber', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  ];
  return boostMap.filter(boost => ingredients.some(ing => ing.toLowerCase().includes(boost.trigger.toLowerCase())));
};

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Reset state whenever the slug changes to prevent "ghost" data
    setRecipe(null);
    setLoading(true);

    async function fetchRecipe() {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('recipes')
          .select(`
            id,
            title,
            description,
            instructions,
            source_type,
            rating_count,
            rating_sum,
            recipe_ingredients (
              quantity_display,
              ingredients (
                name
              )
            )
          `)
          .eq('slug', slug)
          .single();

        if (error) throw error;

        const formatted: RecipeDetail = {
          id: data.id,
          title: data.title,
          description: data.description || '',
          instructions: Array.isArray(data.instructions) ? data.instructions : [],
          source_type: data.source_type,
          rating_count: Number(data.rating_count) || 0,
          rating_sum: Number(data.rating_sum) || 0,
          ingredients: data.recipe_ingredients?.map((ri: any) => {
            const ingredientData = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
            return {
              name: ingredientData?.name || 'Unknown Ingredient',
              quantity_display: ri.quantity_display || ''
            };
          }) || []
        };

        setRecipe(formatted);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [slug]); // Correctly triggers on every navigation change

  if (loading) return <div className="p-8 text-center text-green-500 animate-pulse font-bold tracking-widest uppercase text-xs">Squeezing your recipe...</div>;
  if (!recipe) return <div className="p-8 text-center font-bold text-gray-400">Recipe not found.</div>;

  const tags = GET_RECIPE_TAGS(recipe.ingredients.map(i => i.name));
  const avgRating = recipe.rating_count > 0 ? (recipe.rating_sum / recipe.rating_count) : 0;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": ["https://juiceme.app/og-juice.jpg"],
    "author": { "@type": "Organization", "name": "JuiceMe Community" },
    "recipeIngredient": recipe.ingredients.map(i => `${i.quantity_display} ${i.name}`),
    "recipeInstructions": recipe.instructions.map((step, i) => ({
      "@type": "HowToStep",
      "text": step,
      "position": i + 1
    })),
    "aggregateRating": recipe.rating_count > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "ratingCount": recipe.rating_count
    } : undefined
  };

  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="w-full mb-8 mt-4 text-left">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
          {recipe.title}
        </h1>
        
        {recipe.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{recipe.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border flex items-center gap-1 ${
            recipe.source_type === 'human' 
            ? 'bg-blue-50 text-blue-600 border-blue-100' 
            : 'bg-purple-50 text-purple-600 border-purple-100'
          }`}>
            {recipe.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
          </span>

          {tags.map(tag => (
            <span key={tag.name} className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${tag.color}`}>
              {tag.icon} {tag.name}
            </span>
          ))}
        </div>

        <StarRating 
          recipeId={recipe.id} 
          initialRating={avgRating} 
          totalRatings={recipe.rating_count} 
        />
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 italic">Ingredients</h2>
        <ul className="space-y-4">
          {recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                <span className="text-gray-800 font-semibold">{ing.name}</span>
                <span className="text-gray-500 text-sm">{ing.quantity_display}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-xs italic">No ingredients listed for this recipe.</li>
          )}
        </ul>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-12">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 italic">Instructions</h2>
        <div className="space-y-6">
          {recipe.instructions.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                {i + 1}
              </span>
              <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Link href="/" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors mb-8">
        ← Back to Fridge
      </Link>
    </main>
  );
}