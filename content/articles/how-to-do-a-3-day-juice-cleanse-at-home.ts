import type { Article } from './types';

const article: Article = {
  slug: 'how-to-do-a-3-day-juice-cleanse-at-home',
  title: 'How to Do a 3-Day Juice Cleanse at Home (Without Buying a Kit)',
  description: "Skip the $200 delivery kits. Here's how to do a real 3-day juice cleanse at home with your own juicer — what to drink, when, and what to expect.",
  publishedAt: '2026-03-18',
  heroImage: 'https://images.unsplash.com/photo-1543362905-ca4473d5a6ce?w=800&q=80&fit=crop',
  heroAlt: 'Cold-pressed juice bottles lined up on a counter for a cleanse',
  heroPhotographer: {
    name: 'Dose Juice',
    url: 'https://unsplash.com/@dosejuice',
  },
  hook: "You don't need to spend $200 on a delivery kit. A 3-day juice cleanse at home is straightforward — here's the schedule, the recipes, and what to actually expect.",
  tags: ['Health & Nutrition', 'Recipes'],
  relatedRecipeSlugs: ['clean-slate', 'detox-daily', 'pure-hydration'],
  relatedArticleSlugs: ['beginners-guide-to-juicing', 'how-long-does-fresh-juice-last'],
  sections: [
    { type: 'h2', text: 'What a Juice Cleanse Actually Is' },
    { type: 'body', text: 'A juice cleanse means replacing solid food with fresh vegetable and fruit juices for a set period — typically 1 to 3 days. The appeal is giving your digestive system a break from processing solid food while flooding your body with vitamins, minerals, and plant compounds. Three days is the most commonly recommended starting point: long enough to feel a real reset, short enough that it\'s manageable for most people.' },
    { type: 'body', text: "One important note: the dramatic \"toxin-flushing\" claims you'll see in marketing aren't backed by science. Your liver and kidneys do that work continuously, regardless of what you eat. What a cleanse can genuinely do is reduce bloating, reset sugar cravings, and help you pay attention to what you're putting in your body for a few days." },
    { type: 'h2', text: 'Before You Start: The Day Before' },
    { type: 'body', text: "The day before your cleanse, cut out alcohol, caffeine, processed food, meat, and dairy. Eat mostly vegetables, fruits, and whole grains. This makes the transition into day one much easier and reduces the likelihood of a caffeine headache on day two. Prep your produce the night before — wash, peel, and portion carrots, beets, apples, cucumbers, and lemons into containers in the fridge so morning juicing takes under 10 minutes." },
    { type: 'h2', text: 'The Daily Schedule (6 Juices Per Day)' },
    { type: 'body', text: "Aim for one juice every 2–2.5 hours to keep energy levels stable. A typical day looks like this: 7am — Green juice (celery, cucumber, kale, lemon, ginger). 9:30am — Root juice (carrot, beet, apple, ginger). 12pm — Green juice (spinach, cucumber, apple, lime). 2:30pm — Citrus immune juice (orange, lemon, turmeric, ginger). 5pm — Root or tropical juice (carrot, pineapple, orange). 7:30pm — Gentle green juice (cucumber, celery, lemon, mint). Drink water between juices — at least 8 glasses a day. Herbal teas (no caffeine) are fine." },
    { type: 'recipe', slug: 'clean-slate', title: 'Clean Slate', description: 'Cucumber, celery, apple, lemon, ginger — the ideal morning cleanse juice. Gentle, alkalizing, and easy on an empty stomach.' },
    { type: 'recipe', slug: 'detox-daily', title: 'Detox Daily', description: 'Lemon, cucumber, kale, ginger, and mint. Perfect mid-morning or afternoon during a cleanse.' },
    { type: 'recipe', slug: 'pure-hydration', title: 'Pure Hydration', description: 'Watermelon, cucumber, and lemon — the lightest evening juice, easy to digest before sleep.' },
    { type: 'h2', text: 'What to Expect Each Day' },
    { type: 'body', text: "Day 1: You'll probably feel fine for most of it. Some hunger is normal — it's more psychological than physical for the first 12 hours. If you had a lot of caffeine before starting, a mild headache is common by evening. Day 2: This is the hardest day for most people. Energy may dip in the afternoon. You may feel irritable or low. This is normal and temporary. Drink extra water and rest if you can. Day 3: Most people feel noticeably clearer and lighter by day three. Bloating is typically reduced. Sleep often improves." },
    { type: 'tip', text: "If you feel genuinely unwell — dizzy, extremely weak, or faint — eat something. A handful of almonds or a piece of fruit won't ruin anything. A cleanse is a wellness tool, not a test of willpower." },
    { type: 'h2', text: 'Breaking the Cleanse' },
    { type: 'body', text: "Don't end a cleanse by going straight to a heavy meal. On the day after, eat lightly: smoothies, fruit, salads, steamed vegetables, broth-based soups. Reintroduce solid food gradually over 24–48 hours. Your digestive system has been on a break and needs a gentle re-entry. This transition period is also a good time to notice how different foods make you feel when you reintroduce them." },
    { type: 'h2', text: 'Who Should Not Juice Cleanse' },
    { type: 'body', text: "Juice cleanses are not suitable for people who are pregnant or breastfeeding, those with diabetes or blood sugar conditions, anyone with kidney disease (high-oxalate juices can be a concern), or people with a history of eating disorders. If you're on medications or have any chronic health condition, check with your doctor first. A 3-day cleanse is generally low-risk for healthy adults, but it's still a meaningful dietary change." },
  ],
};

export default article;
