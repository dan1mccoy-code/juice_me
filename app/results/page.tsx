"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const GET_BOOST_LABEL = (goalName: string) => {
  const boosts: Record<string, { label: string; icon: string; textColor: string }> = {
    'Immunity': { label: 'Immunity', icon: '🛡️', textColor: 'text-amber-600' },
    'Energy': { label: 'Energy', icon: '⚡', textColor: 'text-orange-600' },
    'Digestion': { label: 'Digestion', icon: '🌿', textColor: 'text-green-600' },
    'Focus': { label: 'Focus', icon: '🧠', textColor: 'text-yellow-600' },
    'Hydration': { label: 'Hydration', icon: '💧', textColor: 'text-blue-600' },
  };
  return boosts[goalName] || null;
};

interface RecipeResult {
  recipe_id: string;
  title: string;
  slug: string;
  view_count: number;
  match_count: number;
  missing_count: number;
  missing_ingredients: string[];
  source_type: string;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const ingredientsParam = searchParams.get('ingredients');
  const goalParam = searchParams.get('goal');
  
  const userIngredients = useMemo(() =>
    ingredientsParam ? ingredientsParam.split(',').map(i => i.trim()).filter(Boolean) : [],
    [ingredientsParam]
  );

  const [recipes, setRecipes] = useState<RecipeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'human' | 'ai'>('all');

  const boostInfo = useMemo(() => 
    goalParam ? GET_BOOST_LABEL(goalParam) : null, 
    [goalParam]
  );

  useEffect(() => {
    async function fetchMatches() {
      if (userIngredients.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const { data: ingData, error: ingError } = await supabase
          .from('ingredients')
          .select('id')
          .in('name', userIngredients);

        if (ingError) throw ingError;
        
        const ingredientIds = ingData?.map(i => i.id) || [];

        if (ingredientIds.length > 0) {
          const { data: recipeData, error: recipeError } = await supabase
            .rpc('find_juices', { user_ingredient_ids: ingredientIds });

          if (recipeError) throw recipeError;
          setRecipes(recipeData || []);
        } else {
          setRecipes([]);
        }
      } catch (error: any) {
        console.error("Database Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [userIngredients]);

  const filteredRecipes = recipes.filter(r => 
    activeFilter === 'all' ? true : r.source_type === activeFilter
  );

  // LOGIC: Identify which ingredients are most commonly missing across all potential recipes
  const missingIngredientSuggestions = useMemo(() => {
    if (recipes.length === 0 || loading) return [];
    
    const counts: Record<string, number> = {};
    recipes.forEach(r => {
      r.missing_ingredients.forEach(ing => {
        counts[ing] = (counts[ing] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1]) // Sort by frequency
      .slice(0, 3); // Top 3
  }, [recipes, loading]);

  return (
    <div className="w-full">
      <div className="w-full mb-8 mt-4">
        {boostInfo ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{boostInfo.icon}</span>
              <h1 className={`text-3xl font-bold tracking-tight ${boostInfo.textColor}`}>
                {boostInfo.label}
              </h1>
            </div>
            <p className="text-gray-500 font-medium ml-8 tracking-tight">
              Here are the best juices for {boostInfo.label.toLowerCase()}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Matches</h1>
            <p className="text-gray-500 mt-1 font-medium tracking-tight">Based on your fridge items</p>
          </div>
        )}
      </div>

      {!loading && recipes.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {(['all', 'human', 'ai'] as const).map((type) => (
            <button 
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-black transition-all whitespace-nowrap ${
                activeFilter === type 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-white border border-gray-100 text-gray-400 hover:border-green-200'
              }`}
            >
              {type === 'all' ? 'All' : type === 'human' ? 'Human Recipe' : 'AI Recipe'}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center py-20">
          <div className="w-10 h-10 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p className="text-green-600 font-bold text-xs tracking-widest uppercase">Fetching Juices...</p>
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {!loading && filteredRecipes.length === 0 && (
        <div className="flex flex-col items-center py-12 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* Empty fridge graphic — same style as home page carrot */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-6xl">🧊</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xl">?</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2">Fridge is looking a bit light!</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-[280px]">
            We couldn't find a perfect match, but you are <b>so close</b> to these favorites:
          </p>

          <div className="w-full space-y-3 mb-10">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left ml-2">
              Try adding one of these:
            </h3>
            {missingIngredientSuggestions.map(([name, count]) => (
              <div 
                key={name}
                className="w-full bg-white border border-gray-100 rounded-3xl p-5 flex justify-between items-center shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-black">
                    +
                  </span>
                  <span className="font-bold text-gray-800 capitalize tracking-tight">{name}</span>
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  +{count} Recipes
                </span>
              </div>
            ))}
          </div>

          <Link 
            href="/"
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Go Back & Edit Fridge
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
        {filteredRecipes.map((recipe) => (
          <Link 
            href={`/recipe/${recipe.slug}`} 
            key={recipe.recipe_id} 
            className="block w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-green-300 transition-all active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{recipe.title}</h3>
              <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                {recipe.source_type === 'human' ? '🧑‍🍳' : '🤖'}
              </span>
            </div>
            <div className="mt-4">
              {Number(recipe.missing_count) === 0 ? (
                <span className="inline-block bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  ✅ Ready to juice
                </span>
              ) : (
                <span className="inline-block bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-yellow-100">
                  Almost there! Add: {recipe.missing_ingredients.join(', ')}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="flex flex-col items-center p-6 max-w-2xl mx-auto min-h-screen">
      <Suspense fallback={<div className="mt-12 text-green-500 animate-pulse font-medium tracking-widest uppercase text-xs">Loading Results...</div>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}