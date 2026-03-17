import type { Article } from './types';

const article: Article = {
  slug: 'what-to-grab-from-the-produce-aisle',
  title: 'What to Grab from the Produce Aisle to Make a Great Green Juice',
  description: "Standing in the produce section and not sure what to buy? Here's exactly what to grab for a great green juice every time.",
  publishedAt: '2026-03-05',
  heroImage: 'https://images.unsplash.com/photo-1543362905-bddfadc3d44f?w=800&q=80&fit=crop',
  heroAlt: 'Flat lay of fresh green vegetables and herbs on a white surface',
  heroPhotographer: {
    name: 'Dose Juice',
    url: 'https://unsplash.com/@dosejuice',
  },
  hook: "Standing in front of a wall of vegetables with no idea what to grab? We've been there. Here's your produce aisle cheat sheet.",
  tags: ['Recipes', 'Health & Nutrition'],
  relatedRecipeSlugs: ['cucumber-apple-mint', 'kale-kickstart', 'lemon-ginger-blast'],
  relatedArticleSlugs: ['best-juicing-combinations-for-beginners'],
  sections: [
    { type: 'h2', text: 'Start With a Green Base' },
    { type: 'body', text: "Every great green juice needs a leafy foundation. Reach for a bunch of kale or a bag of spinach — spinach is milder and more forgiving if you're new to green juices. One large handful is enough for a single serving." },
    { type: 'h2', text: 'Add Something Sweet' },
    { type: 'body', text: "Green juice on its own can be pretty intense. A green apple or half a cup of pineapple balances the bitterness and makes the whole thing much more drinkable. Green apple also adds a crisp, clean flavor that pairs well with almost any vegetable." },
    { type: 'tip', text: 'Pro tip: One green apple + one cucumber is the classic green juice combo. If you grab nothing else, grab those two.' },
    { type: 'h2', text: "Don't Skip the Citrus" },
    { type: 'body', text: "Half a lemon — squeezed in at the end or juiced with the rest — brightens up every other ingredient in the glass. It also acts as a natural preservative, keeping the juice fresher for longer if you're making a batch." },
    { type: 'h2', text: 'Finish With a Kick' },
    { type: 'body', text: "A small knob of fresh ginger (about an inch) adds warmth and has real anti-inflammatory benefits. It's optional, but once you try it, it's hard to go back. Just don't overdo it — a little goes a very long way." },
  ],
};

export default article;
