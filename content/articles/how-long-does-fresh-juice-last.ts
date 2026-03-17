import type { Article } from './types';

const article: Article = {
  slug: 'how-long-does-fresh-juice-last',
  title: 'How Long Does Fresh Juice Last? Storage Rules That Actually Matter',
  description: "Fresh juice goes bad faster than most people think. Here's how long it lasts by juicer type, what kills it early, and how to store it right.",
  publishedAt: '2026-03-17',
  heroImage: 'https://images.unsplash.com/photo-1620429195658-bff06a35e6a6?w=800&q=80&fit=crop',
  heroAlt: 'Clear glass jar filled with bright green juice on a kitchen counter',
  heroPhotographer: {
    name: 'Margaret Jaszowska',
    url: 'https://unsplash.com/@margaret_jaszowska',
  },
  hook: "Made a big batch of juice and wondering how long it will keep? The answer depends on your juicer — and it's shorter than most people expect.",
  tags: ['Health & Nutrition', 'Kitchen Tools'],
  relatedRecipeSlugs: ['celery-cleanse', 'green-warrior', 'morning-kick'],
  relatedArticleSlugs: ['beginners-guide-to-juicing', 'best-juicing-combinations-for-beginners'],
  sections: [
    { type: 'h2', text: 'The Short Answer' },
    { type: 'body', text: 'Centrifugal juicer juice: drink within 15–30 minutes, or refrigerate for up to 24 hours. Cold press (masticating) juice: stays good for 48–72 hours when sealed airtight and refrigerated. The difference comes down to oxidation — how much air gets mixed into the juice during extraction.' },
    { type: 'h2', text: 'Why Juice Goes Bad So Fast' },
    { type: 'body', text: "Fresh juice doesn't have the preservatives, pasteurization, or packaging that store-bought juice uses to stay shelf-stable for months. The moment you juice produce, enzymes activate and oxidation begins. Oxygen breaks down vitamins — vitamin C in particular — darkens the color, and changes the flavor. The faster and more violently juice is made (centrifugal), the more air gets incorporated and the faster it degrades. The slower and gentler the extraction (cold press), the less oxidation and the longer it stays fresh." },
    { type: 'h2', text: 'Centrifugal Juicer: Drink It Fresh' },
    { type: 'body', text: "If you're using a centrifugal juicer, the general rule is drink it immediately. You'll notice the color starts to change and the flavor flattens within an hour at room temperature. In the fridge in a sealed container, it's acceptable for up to 24 hours — but you'll lose meaningful nutrition, especially from leafy greens. If you're juicing with a centrifugal machine and want to batch, limit it to one day's worth at a time." },
    { type: 'h2', text: 'Cold Press Juicer: Up to 72 Hours' },
    { type: 'body', text: "Cold press (masticating) juicers generate almost no heat and incorporate far less air. That's why the juice retains more nutrients, keeps its color better, and lasts significantly longer. Sealed in a glass mason jar with minimal air space — pour to the very top before sealing — cold press juice stays fresh for 48 hours reliably, and up to 72 hours for most blends. Root vegetable juices (carrot, beet) hold up slightly longer than leafy green blends, which are more sensitive to oxidation." },
    { type: 'tip', text: 'Fill your storage jar completely to the top before sealing. Less air space = less oxidation = fresher juice for longer.' },
    { type: 'h2', text: 'The Right Container Makes a Difference' },
    { type: 'body', text: "Glass beats plastic every time for juice storage. Glass is non-porous, doesn't absorb flavors or smells, and won't leach anything into your juice. Wide-mouth mason jars are the gold standard — easy to fill to the brim, easy to clean. Avoid leaving juice in the juicer's collection jug for any length of time; it's typically plastic and the wide opening lets in too much air. If you need to use plastic, make sure it's BPA-free and still fill it to the top." },
    { type: 'h2', text: 'Can You Freeze Fresh Juice?' },
    { type: 'body', text: "Yes — freezing is a legitimate option for extending juice life up to 3 months. You'll lose some water-soluble vitamins in the freeze-thaw cycle, but it's better than letting juice go to waste. Leave about an inch of headspace when freezing in glass, since liquid expands. Thaw overnight in the fridge and drink the same day after thawing. Citrus-based juices freeze particularly well; green juices with high chlorophyll content tend to separate more and lose some vibrancy, but are still usable." },
    { type: 'h2', text: 'Signs Your Juice Has Gone Bad' },
    { type: 'body', text: "Fresh juice that's still good smells clean and bright — like the produce it was made from. Juice that has turned will smell sour, fermented, or off. The color will be noticeably darker and duller. Taste-wise, it'll be flat or unpleasantly tangy rather than fresh. When in doubt, throw it out. Juice doesn't have the visible mold cues that solid food does — the degradation is microbial and enzymatic, not always visually obvious." },
    { type: 'tip', text: 'Label your jars with the date and time you made the juice. It sounds fussy, but after a few days in the fridge it\'s genuinely hard to remember how old something is.' },
    { type: 'h2', text: 'Batch Juicing Efficiently' },
    { type: 'body', text: "If you want to batch juice for the week, a cold press juicer is the tool for the job. Make three days' worth on Sunday and another batch on Wednesday. Store in glass mason jars, filled to the brim. Buy pre-washed greens and pre-cut root vegetables to make midweek juicing faster. With a centrifugal juicer, batching doesn't make as much sense nutritionally — you're better off juicing fresh each morning, which only takes 5–10 minutes once produce is prepped." },
  ],
};

export default article;
