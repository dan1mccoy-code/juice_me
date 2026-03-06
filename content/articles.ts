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
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'recipe'; slug: string; title: string; description: string };

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
    slug: 'beginners-guide-to-juicing',
    title: "Beginner's Guide to Juicing: What You Need and How to Start",
    description: "New to juicing? Here's exactly what to buy, what to juice first, and how to get a good result every time. No fluff — just what works.",
    publishedAt: '2026-03-06',
    heroImage: 'https://images.unsplash.com/photo-1703108158603-02a5a9db8302?w=800&q=80&fit=crop',
    heroAlt: 'Close-up of a blender filled with fresh orange juice',
    hook: 'Starting to juice is simple. Getting a good result the first time is what most beginners miss. Here\'s the equipment, the ingredients, and the method — so you\'re not guessing on day one.',
    tags: ['Health & Nutrition', 'Kitchen Tools'],
    relatedRecipeSlugs: ['apple-carrot-ginger', 'cucumber-apple-mint', 'carrot-beet-apple'],
    relatedArticleSlugs: ['best-juicing-combinations-for-beginners', 'what-to-grab-from-the-produce-aisle'],
    sections: [
      { type: 'h2', text: 'Do You Actually Need a Juicer?' },
      { type: 'body', text: 'Yes, if you want real juice. Blenders make smoothies — thick, fiber-heavy drinks where the pulp stays in. Juicers extract liquid and leave the fiber behind. The result is thinner, more concentrated, and easier to drink in volume.' },
      { type: 'body', text: 'That said, not all juicers are the same.' },
      { type: 'h2', text: 'Centrifugal Juicers' },
      { type: 'body', text: 'These are the most common and affordable. A spinning blade shreds produce and forces juice through a mesh filter. They\'re fast and easy to clean — you can have a juice ready in under two minutes. The trade-off: the spinning generates heat, which can degrade some nutrients. The juice also oxidizes quickly, so it\'s best to drink it right away. Good for: beginners, everyday use, budget-conscious buyers. Price range: $60–$200.' },
      { type: 'h2', text: 'Masticating (Cold Press) Juicers' },
      { type: 'body', text: 'These crush and press produce slowly, generating little to no heat. The juice retains more nutrients and stays fresh longer — up to 72 hours in a sealed container. The trade-off: they\'re slower, harder to clean, and significantly more expensive. Good for: daily juicers who want maximum quality, leafy greens (spinach, kale, wheatgrass). Price range: $150–$500+.' },
      { type: 'tip', text: 'Recommendation for beginners: Start with a centrifugal juicer. Learn what you like, build the habit, then upgrade if you want to.' },
      { type: 'h2', text: 'What to Buy at the Store' },
      { type: 'body', text: 'You don\'t need a lot to start. The following ingredients are cheap, widely available, and produce consistent, good-tasting juice.' },
      { type: 'h2', text: 'The Four Beginner Staples' },
      { type: 'body', text: 'Apples — the best natural sweetener in juicing. One or two apples balance out almost any bitter or earthy vegetable. Always include one if you\'re adding greens. Carrots — sweet, high-yield, easy to juice. They pair with nearly everything and form the base of dozens of classic combinations. Cucumber — mostly water, which makes it a high-volume, mild-tasting base. It stretches your juice without adding much flavor. Ginger — a small knob (about an inch) adds a clean, sharp kick. It also helps with digestion and reduces inflammation. Don\'t skip it once you\'ve tried it.' },
      { type: 'tip', text: 'Add these once you\'re comfortable: celery (gut health), beets (earthy and sweet), kale or spinach (nutrient-dense — balance with apple), lemon (brightens any combination), turmeric (anti-inflammatory, pairs well with carrot and ginger).' },
      { type: 'h2', text: 'Your First Three Recipes' },
      { type: 'body', text: 'These are straightforward, forgiving, and work in any centrifugal juicer.' },
      { type: 'recipe', slug: 'apple-carrot-ginger', title: 'Apple Carrot Ginger Juice', description: 'The most reliable beginner recipe. Sweet, slightly spicy, no bitterness. Yields ~12–14 oz.' },
      { type: 'recipe', slug: 'cucumber-apple-mint', title: 'Cucumber Apple Mint Juice', description: 'Light and refreshing. Good as a morning juice or afternoon pick-me-up. Yields ~14–16 oz.' },
      { type: 'recipe', slug: 'carrot-beet-apple', title: 'Carrot Beet Apple Juice', description: 'Slightly earthy, naturally sweet, high in nutrients. The color is striking. Yields ~12–14 oz.' },
      { type: 'tip', text: 'Got other ingredients on hand? Use the JuiceMe ingredient tool — enter what\'s in your kitchen and it shows you every recipe you can make right now.' },
      { type: 'h2', text: 'How to Actually Use Your Juicer' },
      { type: 'body', text: 'Wash everything, even ingredients you\'re peeling. Remove pits from stone fruits — they can damage the blade. Leave the skin on apples, cucumbers, and most vegetables. Peel citrus fruits — the white pith makes juice bitter. Cut produce into pieces that fit your juicer\'s feed tube.' },
      { type: 'h2', text: 'Order of Juicing' },
      { type: 'body', text: 'Run ingredients in this order: soft produce first (leafy greens, herbs, cucumber), then hard produce (carrots, beets, ginger), then finish with apple or citrus. The high water content of apple and citrus flushes remaining pulp through the machine and extracts every last bit of juice from the previous ingredients.' },
      { type: 'h2', text: 'Common Beginner Mistakes' },
      { type: 'body', text: 'Making it too sweet. A good ratio is roughly 80% vegetables, 20% fruit. Juicing leafy greens in a centrifugal juicer without prep — roll them into a tight ball before feeding them in. Letting juice sit — drink within 15–30 minutes for maximum nutrition. Skipping the cleaning step — clean immediately after use, pulp dries fast. Starting with too many ingredients — three or four is enough.' },
      { type: 'h2', text: 'What to Do With the Pulp' },
      { type: 'body', text: "Don't throw it away. Carrot pulp works in muffins and veggie burgers. Beet pulp can be added to brownie batter. Vegetable pulp can be dehydrated into crackers or composted. Apple pulp works in oatmeal or baked goods. If you're not using it immediately, freeze it." },
      { type: 'h2', text: 'A Simple Weekly Routine' },
      { type: 'body', text: 'Two to four times per week is sustainable for most people. Sunday: buy produce in bulk (carrots, apples, cucumbers, ginger stay fresh 5–7 days). Morning of: prep and juice in under 10 minutes with a centrifugal juicer. Immediately after: clean the juicer while you drink.' },
      { type: 'tip', text: 'The biggest reason people stop juicing is the cleanup. Keep the juicer on the counter, not stored away — out of sight means out of routine.' },
      { type: 'h2', text: 'What to Try Next' },
      { type: 'body', text: "Once you've made the first three recipes a few times, start experimenting. The best way to build a juice habit is to work with what you already have at home rather than buying specific ingredients for each recipe. Enter your ingredients on JuiceMe and find every juice recipe you can make from them. No substitutions required." },
    ],
  },

  {
    slug: 'best-juicing-combinations-for-beginners',
    title: 'The 5 Best Juicing Combinations for Beginners',
    description: 'New to juicing? These five simple ingredient combinations are crowd-pleasing, easy to find, and genuinely delicious.',
    publishedAt: '2026-03-06',
    heroImage: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80&fit=crop',
    heroAlt: 'Colorful fresh juice drinks made from fruits and vegetables',
    hook: 'New to juicing and not sure where to start? These five combinations are easy to find, hard to mess up, and genuinely delicious.',
    tags: ['Recipes'],
    relatedRecipeSlugs: ['apple-carrot-ginger', 'watermelon-cooler', 'tropical-green'],
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
    relatedRecipeSlugs: ['cucumber-apple-mint', 'kale-kickstart', 'lemon-ginger-blast'],
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
