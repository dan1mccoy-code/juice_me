export type { ArticleTag, ArticleSection, Article } from './types';

import beginners from './beginners-guide-to-juicing';
import combinations from './best-juicing-combinations-for-beginners';
import produceAisle from './what-to-grab-from-the-produce-aisle';
import juiceStorage from './how-long-does-fresh-juice-last';
import cleanse from './how-to-do-a-3-day-juice-cleanse-at-home';
import celery from './celery-juice-what-the-science-says';
import juicerComparison from './centrifugal-vs-cold-press-juicer';
import energyJuices from './best-juices-for-energy-without-caffeine';

import type { Article, ArticleTag } from './types';

export const articles: Article[] = [
  energyJuices,
  juicerComparison,
  celery,
  cleanse,
  juiceStorage,
  beginners,
  combinations,
  produceAisle,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByTag(tag: ArticleTag): Article[] {
  return articles.filter(a => a.tags.includes(tag));
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs.map(s => articles.find(a => a.slug === s)).filter(Boolean) as Article[];
}

export function getArticlesForRecipe(recipeSlug: string): Article[] {
  return articles.filter(a => a.relatedRecipeSlugs.includes(recipeSlug));
}
