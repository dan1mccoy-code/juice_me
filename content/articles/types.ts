export type ArticleTag = 'Recipes' | 'Health & Nutrition' | 'Kitchen Tools';

export type ArticleSection =
  | { type: 'h2'; text: string }
  | { type: 'body'; text: string }
  | { type: 'tip'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'recipe'; slug: string; title: string; description: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  heroImage: string;
  heroAlt: string;
  heroPhotographer: {
    name: string;
    url: string;
  };
  hook: string;
  tags: ArticleTag[];
  relatedRecipeSlugs: string[];
  relatedArticleSlugs: string[];
  sections: ArticleSection[];
}
