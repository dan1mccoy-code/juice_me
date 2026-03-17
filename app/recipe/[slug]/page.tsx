import { cache } from 'react';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import StarRating from '@/components/StarRating';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import { getArticlesForRecipe } from '@/content/articles';

const PAIRING_BY_CATEGORY: Record<string, string> = {
  Green: 'a slice of avocado toast or a handful of mixed seeds',
  Citrus: 'a handful of mixed nuts or a piece of whole-grain toast',
  Root: 'a hard-boiled egg or a small bowl of oatmeal',
  Tropical: 'coconut yogurt with granola or a piece of fresh fruit',
  Wellness: 'a light protein snack such as almonds or a boiled egg',
  Hydration: 'cucumber slices with hummus or a light green salad',
  Energy: 'a banana or energy bar 30 minutes before exercise',
};

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

const getRecipe = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      id,
      title,
      description,
      category,
      instructions,
      source_type,
      rating_count,
      rating_sum,
      nutrition_perks,
      recipe_ingredients (
        quantity_display,
        ingredients (
          name
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    id: data.id as string,
    title: data.title as string,
    description: (data.description as string) || '',
    category: (data.category as string) || '',
    instructions: Array.isArray(data.instructions) ? data.instructions as string[] : [],
    source_type: data.source_type as string,
    rating_count: Number(data.rating_count) || 0,
    rating_sum: Number(data.rating_sum) || 0,
    nutrition_perks: Array.isArray((data as any).nutrition_perks) ? (data as any).nutrition_perks as string[] : [],
    ingredients: (data.recipe_ingredients as any[])?.map((ri) => {
      const ing = Array.isArray(ri.ingredients) ? ri.ingredients[0] : ri.ingredients;
      return {
        name: ing?.name || 'Unknown Ingredient',
        quantity_display: ri.quantity_display || '',
      };
    }) || [],
  };
});

const getSimilarRecipes = cache(async (category: string, currentSlug: string) => {
  const { data } = await supabase
    .from('recipes')
    .select('title, slug, source_type, rating_count, rating_sum')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('rating_count', { ascending: false })
    .limit(6);
  return data || [];
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) return {};

  const description = recipe.description ||
    `How to make ${recipe.title} — a healthy juice recipe with ${recipe.ingredients.slice(0, 3).map(i => i.name).join(', ')}.`;

  const fullTitle = `${recipe.title} Juice Recipe — JuiceMe`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `/recipe/${slug}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `/recipe/${slug}`,
      type: 'article',
      images: [{ url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80&fit=crop', width: 1200, height: 630, alt: recipe.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80&fit=crop'],
    },
  };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  const [tags, similarRecipes] = await Promise.all([
    Promise.resolve(GET_RECIPE_TAGS(recipe.ingredients.map(i => i.name))),
    getSimilarRecipes(recipe.category, slug),
  ]);

  const relatedArticles = getArticlesForRecipe(slug);

  const avgRating = recipe.rating_count > 0 ? (recipe.rating_sum / recipe.rating_count) : 0;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    'name': recipe.title,
    'description': recipe.description || `How to make ${recipe.title} — a healthy juice recipe with ${recipe.ingredients.slice(0, 3).map(i => i.name).join(', ')}.`,
    'image': ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80&fit=crop'],
    'author': { '@type': 'Organization', 'name': 'JuiceMe', 'url': 'https://juiceme.app' },
    'publisher': { '@type': 'Organization', 'name': 'JuiceMe', 'url': 'https://juiceme.app' },
    'datePublished': '2026-01-01',
    'recipeCategory': recipe.category,
    'recipeCuisine': 'Healthy',
    'totalTime': 'PT10M',
    'recipeYield': '1 serving',
    'keywords': recipe.ingredients.map(i => i.name).join(', '),
    'recipeIngredient': recipe.ingredients.map(i => `${i.quantity_display} ${i.name}`.trim()),
    'recipeInstructions': recipe.instructions.map((step, i) => {
      const firstSentence = step.split(/[.!?]/)[0].trim();
      const name = firstSentence.length > 60
        ? firstSentence.slice(0, 57).trimEnd() + '...'
        : firstSentence;
      return {
        '@type': 'HowToStep',
        'position': i + 1,
        'name': name || `Step ${i + 1}`,
        'text': step,
        'url': `https://juiceme.app/recipe/${slug}#step-${i + 1}`,
      };
    }),
    ...(recipe.rating_count > 0 && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avgRating.toFixed(1),
        'reviewCount': recipe.rating_count,
        'bestRating': '5',
        'worstRating': '1',
      },
    }),
  };

  return (
    <main className="flex flex-col items-center p-6 max-w-3xl mx-auto min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="w-full mb-8 mt-4 text-left">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
          {recipe.title}
        </h1>

        <StarRating
          recipeId={recipe.id}
          initialRating={avgRating}
          totalRatings={recipe.rating_count}
        />

        <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
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

        {recipe.description && (
          <p className="text-gray-600 text-base leading-relaxed">{recipe.description}</p>
        )}
      </div>

      {/* Ingredients */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ingredients</h2>
        <ul className="space-y-4">
          {recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                <Link href={`/ingredients/${encodeURIComponent(ing.name.toLowerCase())}`} className="text-gray-800 font-semibold hover:text-green-600 transition-colors">
                  {ing.name}
                </Link>
                <span className="text-gray-500 text-sm">{ing.quantity_display}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-xs italic">No ingredients listed for this recipe.</li>
          )}
        </ul>
      </div>

      {/* Other Blends */}
      {similarRecipes.length > 0 && (
        <div className="w-full mb-6">
          <h2 className="text-xl font-bold mb-4">Other Blends</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
            {similarRecipes.map((r: any) => {
              const avg = r.rating_count > 0
                ? (r.rating_sum / r.rating_count).toFixed(1)
                : '0.0';
              return (
                <Link
                  key={r.slug}
                  href={`/recipe/${r.slug}`}
                  className="relative min-w-[200px] md:min-w-0 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 flex flex-col justify-between snap-start active:scale-95 transition-all hover:border-green-200"
                >
                  {r.rating_count > 5 && (
                    <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-md tracking-widest uppercase">
                      HOT
                    </span>
                  )}
                  <div>
                    <p className="font-bold text-base leading-tight mb-2 line-clamp-2">{r.title}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⭐</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {avg} ({r.rating_count})
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${r.source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
                      {r.source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
                    </span>
                    <span className="text-gray-200 font-bold">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Instructions</h2>
        <div className="space-y-6">
          {recipe.instructions.map((step, i) => (
            <div key={i} id={`step-${i + 1}`} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                {i + 1}
              </span>
              <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Snapshot */}
      {recipe.nutrition_perks.length > 0 && (
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Nutrition Snapshot</h2>
          <p className="text-xs text-gray-400 mb-4">Key compounds & what they do</p>
          <ul className="space-y-3">
            {recipe.nutrition_perks.map((perk, i) => {
              const [label, benefit] = perk.split(' — ');
              return (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                  <span className="text-sm text-gray-700 leading-snug">
                    <span className="font-semibold text-gray-900">{label}</span>
                    {benefit ? ` — ${benefit}` : ''}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Storage & Serving */}
      <div className="w-full bg-amber-50 rounded-3xl p-6 border border-amber-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Storage & Serving</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Best enjoyed immediately for peak freshness and nutrients. Store leftovers in an airtight glass jar in the fridge for up to 24 hours — shake or stir well before drinking as natural separation occurs. Avoid plastic containers, which can absorb flavors and accelerate oxidation.
        </p>
        <div className="flex items-start gap-2">
          <span className="text-sm font-bold text-amber-700 whitespace-nowrap">Pair with:</span>
          <span className="text-sm text-gray-600">
            {PAIRING_BY_CATEGORY[recipe.category] ?? 'a light protein snack or handful of nuts'}
          </span>
        </div>
      </div>

      {/* From the Blog */}
      {relatedArticles.length > 0 && (
        <div className="w-full mb-6">
          <h2 className="text-xl font-bold mb-4">From the Blog</h2>
          <div className="space-y-3">
            {relatedArticles.map(article => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex gap-4 items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden relative">
                  <img src={article.heroImage} alt={article.heroAlt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{article.title}</p>
                  <div className="flex gap-1 flex-wrap">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-300 font-bold flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ad Unit */}
      <div className="w-full mb-8">
        <AdUnit slot="3779095611" format="auto" responsive />
      </div>

      <Link href="/ingredients" className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors mb-8">
        Choose other ingredients
      </Link>
    </main>
  );
}
