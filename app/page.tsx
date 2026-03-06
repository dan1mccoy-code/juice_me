"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface TrendingRecipe {
  title: string;
  slug: string;
  source_type: string;
  rating_count: number;
  rating_sum: number;
}

export default function Home() {
  const [trending, setTrending] = useState<TrendingRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('title, slug, source_type, rating_count, rating_sum')
          .order('rating_count', { ascending: false }) 
          .limit(6);
        
        if (error) throw error;
        if (data) setTrending(data);
      } catch (err) {
        console.error("Error fetching trending juices:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center mt-12 mb-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🥕</span> 
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight text-center leading-tight">Tell us what you have.<br />We'll help you make it juice.</h1>
      </div>

      {/* The Two Paths */}
      <div className="w-full space-y-4">
        <Link 
          href="/ingredients" 
          className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-medium text-lg py-4 rounded-2xl shadow-sm transition-colors"
        >
          I have ingredients
        </Link>
        
        <Link 
          href="/boost" 
          className="block w-full bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-center font-semibold text-lg py-4 rounded-2xl shadow-sm transition-all active:scale-95"
        >
          I need a boost
        </Link>
      </div>

      {/* Dynamic Trending Section */}
      <div className="w-full mt-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          🔥 Trending This Week
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
          {loading ? (
            [1, 2].map((i) => (
              <div key={i} className="min-w-[220px] h-36 bg-gray-50 rounded-3xl animate-pulse border border-gray-100" />
            ))
          ) : trending.length > 0 ? (
            trending.map((recipe) => {
              const avgRating = recipe.rating_count > 0 
                ? (recipe.rating_sum / recipe.rating_count).toFixed(1) 
                : "0.0";
              
              return (
                /* FIX: Using template literal with recipe.slug for the href */
                <Link 
                  href={`/recipe/${recipe.slug}`}
                  key={recipe.slug} 
                  className="relative min-w-[220px] bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col justify-between snap-start active:scale-95 transition-all hover:border-green-200"
                >
                  {recipe.rating_count > 5 && (
                    <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-md tracking-widest uppercase">
                      HOT
                    </span>
                  )}

                  <div>
                    <p className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                      {recipe.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⭐</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {avgRating} ({recipe.rating_count})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                     <span className={`text-[10px] font-bold uppercase tracking-widest ${recipe.source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
                       {recipe.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
                     </span>
                     <span className="text-gray-200 font-bold">→</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">No trending juices yet!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}