// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW ARTICLE
// ─────────────────────────────────────────────────────────────
// 1. Copy the template object below (between the dashed lines)
// 2. Paste it at the TOP of the `articles` array (newest first)
// 3. Fill in all fields
// 4. git add . && git commit -m "Add article: <title>" && git push
// ─────────────────────────────────────────────────────────────
// TEMPLATE:
// {
//   slug: 'your-url-slug-here',                    // lowercase, hyphens only
//   title: 'Your Article Title Here',
//   description: 'One sentence for Google (meta description, ~150 chars).',
//   publishedAt: '2026-03-07',                      // YYYY-MM-DD
//   heroImage: 'https://images.unsplash.com/...',   // 800x400+ landscape photo URL
//   heroAlt: 'Descriptive alt text for the image',
//   hook: 'One or two sentences shown on the article card and below the title.',
//   tags: ['Recipes'],                              // one or more: 'Recipes' | 'Health & Nutrition' | 'Kitchen Tools'
//   relatedRecipeSlugs: ['slug-one', 'slug-two'],   // 2–3 recipe slugs from the database
//   relatedArticleSlugs: ['other-article-slug'],    // 1–3 article slugs from this file
//   sections: [
//     { type: 'h2', text: 'Section Heading' },
//     { type: 'body', text: 'Paragraph of text.' },
//     { type: 'tip', text: 'Highlighted tip or callout.' },
//     { type: 'image', src: 'https://...', alt: 'alt text', caption: 'Optional caption.' },
//   ],
// },
// ─────────────────────────────────────────────────────────────

export type ArticleTag = 'Recipes' | 'Health & Nutrition' | 'Kitchen Tools';

export type ArticleSection =
  | { type: 'h2'; text: string }
  | { type: 'body'; text: string }
  | { type: 'tip'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  heroImage: string;
  heroAlt: string;
  hook: string;
  tags: ArticleTag[];
  relatedRecipeSlugs: string[];
  relatedArticleSlugs: string[];
  sections: ArticleSection[];
}

export const articles: Article[] = [

  {
    slug: 'best-juicing-combinations-for-beginners',
    title: 'The 5 Best Juicing Combinations for Beginners',
    description: 'New to juicing? These five simple ingredient combinations are crowd-pleasing, easy to find, and genuinely delicious.',
    publishedAt: '2026-03-06',
    heroImage: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80&fit=crop',
    heroAlt: 'Colorful fresh juice drinks made from fruits and vegetables',
    hook: 'New to juicing and not sure where to start? These five combinations are easy to find, hard to mess up, and genuinely delicious.',
    tags: ['Recipes'],
    relatedRecipeSlugs: ['apple-carrot-ginger-juice', 'pineapple-spinach-detox', 'watermelon-mint-refresher'],
    relatedArticleSlugs: ['what-to-grab-from-the-produce-aisle'],
    sections: [
      { type: 'h2', text: '1. Apple, Carrot, Ginger' },
      { type: 'body', text: 'This is the gateway combo of juicing. Naturally sweet from the apple and carrot, with just enough heat from the ginger to feel like it\'s doing something. Use 2 apples, 3 carrots, and a half-inch of ginger. Beginner-friendly and universally crowd-pleasing.' },
      { type: 'h2', text: '2. Orange, Carrot, Turmeric' },
      { type: 'body', text: 'Bright, sunny, and packed with antioxidants. Juice 3 oranges (peeled), 2 carrots, and a small knob of fresh turmeric. The color alone makes it feel like it\'s good for you — and it genuinely is.' },
      { type: 'tip', text: 'Wear an apron when working with turmeric. It stains everything it touches — cutting boards, counters, fingers.' },
      { type: 'h2', text: '3. Cucumber, Mint, Lime' },
      { type: 'body', text: 'Incredibly refreshing and light. Perfect for hot days or post-workout. Use a whole cucumber, a small handful of fresh mint, and the juice of one lime. This one is subtle and hydrating — more like elevated water than a heavy juice.' },
      { type: 'h2', text: '4. Watermelon, Lime, Mint' },
      { type: 'body', text: 'Watermelon is mostly water, which means it juices beautifully with minimal effort. Quarter of a small watermelon, one lime, and a few mint leaves. No juicer required — a blender and a fine mesh strainer work perfectly.' },
      { type: 'h2', text: '5. Pineapple, Spinach, Cucumber' },
      { type: 'body', text: 'The classic "hidden greens" combo. The pineapple is so sweet and bold that you genuinely can\'t taste the spinach. Use a cup of pineapple chunks, a large handful of spinach, and half a cucumber. Great for convincing skeptics that green juice can taste good.' },
    ],
  },

  {
    slug: 'what-to-grab-from-the-produce-aisle',
    title: 'What to Grab from the Produce Aisle to Make a Great Green Juice',
    description: 'Standing in the produce section and not sure what to buy? Here\'s exactly what to grab for a great green juice every time.',
    publishedAt: '2026-03-05',
    heroImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80&fit=crop',
    heroAlt: 'Fresh green vegetables and fruits arranged in a produce section',
    hook: 'Standing in front of a wall of vegetables with no idea what to grab? We\'ve been there. Here\'s your produce aisle cheat sheet.',
    tags: ['Recipes', 'Health & Nutrition'],
    relatedRecipeSlugs: ['green-apple-cucumber-cleanser', 'kale-lemon-ginger-boost', 'spinach-pineapple-green'],
    relatedArticleSlugs: ['best-juicing-combinations-for-beginners'],
    sections: [
      { type: 'h2', text: 'Start With a Green Base' },
      { type: 'body', text: 'Every great green juice needs a leafy foundation. Reach for a bunch of kale or a bag of spinach — spinach is milder and more forgiving if you\'re new to green juices. One large handful is enough for a single serving.' },
      { type: 'h2', text: 'Add Something Sweet' },
      { type: 'body', text: 'Green juice on its own can be pretty intense. A green apple or half a cup of pineapple balances the bitterness and makes the whole thing much more drinkable. Green apple also adds a crisp, clean flavor that pairs well with almost any vegetable.' },
      { type: 'tip', text: 'Pro tip: One green apple + one cucumber is the classic green juice combo. If you grab nothing else, grab those two.' },
      { type: 'h2', text: 'Don\'t Skip the Citrus' },
      { type: 'body', text: 'Half a lemon — squeezed in at the end or juiced with the rest — brightens up every other ingredient in the glass. It also acts as a natural preservative, keeping the juice fresher for longer if you\'re making a batch.' },
      { type: 'h2', text: 'Finish With a Kick' },
      { type: 'body', text: 'A small knob of fresh ginger (about an inch) adds warmth and has real anti-inflammatory benefits. It\'s optional, but once you try it, it\'s hard to go back. Just don\'t overdo it — a little goes a very long way.' },
    ],
  },

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

// Returns all articles that link to a given recipe slug
export function getArticlesForRecipe(recipeSlug: string): Article[] {
  return articles.filter(a => a.relatedRecipeSlugs.includes(recipeSlug));
}
