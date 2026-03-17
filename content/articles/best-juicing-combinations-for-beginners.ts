import type { Article } from './types';

const article: Article = {
  slug: 'best-juicing-combinations-for-beginners',
  title: 'The 5 Best Juicing Combinations for Beginners',
  description: 'New to juicing? These five simple ingredient combinations are crowd-pleasing, easy to find, and genuinely delicious.',
  publishedAt: '2026-03-06',
  heroImage: 'https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=800&q=80&fit=crop',
  heroAlt: 'Colorful fresh juice drinks made from fruits and vegetables on a table',
  heroPhotographer: {
    name: 'Element5 Digital',
    url: 'https://unsplash.com/@element5digital',
  },
  hook: 'New to juicing and not sure where to start? These five combinations are easy to find, hard to mess up, and genuinely delicious.',
  tags: ['Recipes'],
  relatedRecipeSlugs: ['apple-carrot-ginger', 'watermelon-cooler', 'tropical-green'],
  relatedArticleSlugs: ['what-to-grab-from-the-produce-aisle'],
  sections: [
    { type: 'h2', text: '1. Apple, Carrot, Ginger' },
    { type: 'body', text: "This is the gateway combo of juicing. Naturally sweet from the apple and carrot, with just enough heat from the ginger to feel like it's doing something. Use 2 apples, 3 carrots, and a half-inch of ginger. Beginner-friendly and universally crowd-pleasing." },
    { type: 'h2', text: '2. Orange, Carrot, Turmeric' },
    { type: 'body', text: "Bright, sunny, and packed with antioxidants. Juice 3 oranges (peeled), 2 carrots, and a small knob of fresh turmeric. The color alone makes it feel like it's good for you — and it genuinely is." },
    { type: 'tip', text: 'Wear an apron when working with turmeric. It stains everything it touches — cutting boards, counters, fingers.' },
    { type: 'h2', text: '3. Cucumber, Mint, Lime' },
    { type: 'body', text: 'Incredibly refreshing and light. Perfect for hot days or post-workout. Use a whole cucumber, a small handful of fresh mint, and the juice of one lime. This one is subtle and hydrating — more like elevated water than a heavy juice.' },
    { type: 'h2', text: '4. Watermelon, Lime, Mint' },
    { type: 'body', text: "Watermelon is mostly water, which means it juices beautifully with minimal effort. Quarter of a small watermelon, one lime, and a few mint leaves. No juicer required — a blender and a fine mesh strainer work perfectly." },
    { type: 'h2', text: '5. Pineapple, Spinach, Cucumber' },
    { type: 'body', text: "The classic \"hidden greens\" combo. The pineapple is so sweet and bold that you genuinely can't taste the spinach. Use a cup of pineapple chunks, a large handful of spinach, and half a cucumber. Great for convincing skeptics that green juice can taste good." },
  ],
};

export default article;
