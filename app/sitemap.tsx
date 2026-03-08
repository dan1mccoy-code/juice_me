import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { articles } from '@/content/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://juiceme.app'; // Replace with your actual domain

  // 1. Fetch all recipe slugs and ingredient names from the database
  const [{ data: recipes }, { data: ingredients }] = await Promise.all([
    supabase.from('recipes').select('slug'),
    supabase.from('ingredients').select('name'),
  ]);

  // 2. Map recipes and ingredients to sitemap format
  const recipeUrls = (recipes || []).map((recipe) => ({
    url: `${baseUrl}/recipe/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const ingredientUrls = (ingredients || []).map((ingredient) => ({
    url: `${baseUrl}/ingredients/${encodeURIComponent(ingredient.name.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 3. Define static pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ingredients`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/boost`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...recipeUrls,
    ...ingredientUrls,
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ];
}