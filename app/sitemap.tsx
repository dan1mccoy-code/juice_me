import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://juiceme.app'; // Replace with your actual domain

  // 1. Fetch all recipe slugs from your database
  const { data: recipes } = await supabase
    .from('recipes')
    .select('slug');

  // 2. Map recipes to sitemap format
  const recipeUrls = (recipes || []).map((recipe) => ({
    url: `${baseUrl}/recipe/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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
  ];
}