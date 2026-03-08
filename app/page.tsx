"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import RecipeCard, { type CardIngredient } from '@/components/RecipeCard';

interface TrendingRecipe {
  title: string;
  slug: string;
  source_type: string;
  rating_count: number;
  rating_sum: number;
  ingredients: CardIngredient[];
}

export default function Home() {
  const [trending, setTrending] = useState<TrendingRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('title, slug, source_type, rating_count, rating_sum, recipe_ingredients(ingredients(name))')
          .order('rating_count', { ascending: false })
          .limit(6);

        if (error) throw error;
        if (data) setTrending(data.map((r: any) => ({
          title: r.title,
          slug: r.slug,
          source_type: r.source_type,
          rating_count: r.rating_count,
          rating_sum: r.rating_sum,
          ingredients: (r.recipe_ingredients as any[] ?? [])
            .map((ri: any) => {
              const ing = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
              return ing?.name as string | undefined;
            })
            .filter((n): n is string => !!n)
            .sort()
            .map(name => ({ name })),
        })));
      } catch (err) {
        console.error("Error fetching trending juices:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <main className="flex flex-col items-center p-6 max-w-md md:max-w-2xl mx-auto min-h-screen">
      
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center mt-12 mb-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🥕</span> 
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight text-center leading-tight">Tell us what you have.<br />We'll help you make it juice.</h1>
      </div>

      {/* The Two Paths */}
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <Link
          href="/find"
          className="block sm:flex-1 w-full bg-green-500 hover:bg-green-600 text-white text-center font-medium text-lg py-4 rounded-2xl shadow-sm transition-colors"
        >
          I have ingredients
        </Link>

        <Link
          href="/boost"
          className="block sm:flex-1 w-full bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-center font-semibold text-lg py-4 rounded-2xl shadow-sm transition-all active:scale-95"
        >
          I need a boost
        </Link>
      </div>

      {/* Dynamic Trending Section */}
      <div className="w-full mt-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          🔥 Trending This Week
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-36 bg-gray-50 rounded-3xl animate-pulse border border-gray-100" />
            ))
          ) : trending.length > 0 ? (
            trending.map((recipe) => (
              <RecipeCard
                key={recipe.slug}
                title={recipe.title}
                slug={recipe.slug}
                source_type={recipe.source_type}
                rating_count={recipe.rating_count}
                rating_sum={recipe.rating_sum}
                ingredients={recipe.ingredients}
              />
            ))
          ) : (
            <div className="col-span-3 w-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">No trending juices yet!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}