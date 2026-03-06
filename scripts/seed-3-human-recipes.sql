-- ─────────────────────────────────────────────────────────────
-- Seed 3 new human-authored recipes
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/ejypnkyztcfvkkdkhuds/sql
-- ─────────────────────────────────────────────────────────────

-- Recipe 1: Apple Carrot Ginger
-- Recipe 2: Cucumber Apple Mint
-- Recipe 3: Carrot Beet Apple
-- ─────────────────────────────────────────────────────────────

WITH

-- ── Recipe 1 ────────────────────────────────────────────────
r1 AS (
  INSERT INTO recipes (id, title, slug, description, category, source_type, instructions, rating_count, rating_sum)
  VALUES (
    gen_random_uuid(),
    'Apple Carrot Ginger Juice',
    'apple-carrot-ginger',
    'The classic beginner combo — naturally sweet from apple and carrot, with a warming kick of ginger. Crowd-pleasing, easy to make, and genuinely delicious.',
    'Root',
    'human',
    '[
      "Wash all produce thoroughly under cold water.",
      "Peel the carrots and cut into 3-inch pieces for easier juicing.",
      "Core the apples and cut into quarters — no need to peel.",
      "Peel the ginger or scrub well if using organic.",
      "Feed the carrots, apples, and ginger through the juicer, alternating between them for even extraction.",
      "Stir the juice, pour over ice, and serve immediately. Yields approximately 12–14 oz."
    ]'::jsonb,
    0, 0
  )
  RETURNING id
),

-- ── Recipe 2 ────────────────────────────────────────────────
r2 AS (
  INSERT INTO recipes (id, title, slug, description, category, source_type, instructions, rating_count, rating_sum)
  VALUES (
    gen_random_uuid(),
    'Cucumber Apple Mint Juice',
    'cucumber-apple-mint',
    'Light, clean, and incredibly refreshing. Apple sweetens while cucumber hydrates and mint brightens the whole glass. Great as a morning juice or afternoon reset.',
    'Hydration',
    'human',
    '[
      "Wash the cucumber, apples, and mint thoroughly under cold water.",
      "Cut the cucumber into thirds — no need to peel if organic.",
      "Core the apples and cut into quarters.",
      "Bundle the mint leaves together before feeding into the juicer.",
      "Juice the cucumber and apples first, then push the mint through last to capture maximum flavor.",
      "Stir and serve over ice. Yields approximately 14–16 oz."
    ]'::jsonb,
    0, 0
  )
  RETURNING id
),

-- ── Recipe 3 ────────────────────────────────────────────────
r3 AS (
  INSERT INTO recipes (id, title, slug, description, category, source_type, instructions, rating_count, rating_sum)
  VALUES (
    gen_random_uuid(),
    'Carrot Beet Apple Juice',
    'carrot-beet-apple',
    'Earthy beet, sweet carrot, and crisp apple come together in a beautifully balanced juice. The deep ruby color is as striking as the flavor — and packed with nutrients.',
    'Root',
    'human',
    '[
      "Scrub the beets thoroughly. Peeling is optional but gives a cleaner, less earthy flavor.",
      "Cut the beets into quarters for easier feeding through the juicer.",
      "Peel the carrots and cut into 3-inch pieces.",
      "Core the apple and cut into quarters.",
      "Juice the beets first, then the carrots, then the apple — this order helps flush all the beet color through.",
      "Stir well and serve immediately. The juice will be a deep ruby red. Yields approximately 12–14 oz."
    ]'::jsonb,
    0, 0
  )
  RETURNING id
),

-- ── Recipe Ingredients: Recipe 1 ─────────────────────────────
-- Ingredient IDs:
--   Apple:   454e4ac3-0f20-45ee-a0f3-986252a77f41
--   Carrot:  282a72f3-54c0-45c2-ba4c-c9f28858731b
--   Ginger:  a4f44550-b8c7-4ff0-96f4-b2607aa3c9e6
--   Cucumber: 83588caa-4298-417c-aa49-336f6fbd4d65
--   Mint:    09a9431c-ec11-4246-8694-87aacf535880
--   Beet:    194c85f5-a7a7-48e5-9443-1937e5f6b1e4

ri1 AS (
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity_display)
  SELECT id, '282a72f3-54c0-45c2-ba4c-c9f28858731b'::uuid, '2 large' FROM r1
  UNION ALL
  SELECT id, '454e4ac3-0f20-45ee-a0f3-986252a77f41'::uuid, '2' FROM r1
  UNION ALL
  SELECT id, 'a4f44550-b8c7-4ff0-96f4-b2607aa3c9e6'::uuid, '1-inch piece' FROM r1
  RETURNING recipe_id
),

-- ── Recipe Ingredients: Recipe 2 ─────────────────────────────
ri2 AS (
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity_display)
  SELECT id, '83588caa-4298-417c-aa49-336f6fbd4d65'::uuid, '1 large' FROM r2
  UNION ALL
  SELECT id, '454e4ac3-0f20-45ee-a0f3-986252a77f41'::uuid, '2' FROM r2
  UNION ALL
  SELECT id, '09a9431c-ec11-4246-8694-87aacf535880'::uuid, 'small handful' FROM r2
  RETURNING recipe_id
),

-- ── Recipe Ingredients: Recipe 3 ─────────────────────────────
ri3 AS (
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity_display)
  SELECT id, '194c85f5-a7a7-48e5-9443-1937e5f6b1e4'::uuid, '2 medium' FROM r3
  UNION ALL
  SELECT id, '282a72f3-54c0-45c2-ba4c-c9f28858731b'::uuid, '2 large' FROM r3
  UNION ALL
  SELECT id, '454e4ac3-0f20-45ee-a0f3-986252a77f41'::uuid, '1' FROM r3
  RETURNING recipe_id
)

-- Confirm what was inserted
SELECT 'Recipes and ingredients inserted successfully' AS result;
