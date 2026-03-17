-- ─────────────────────────────────────────────────────────────
-- Add nutrition data to ingredients table
-- Add nutrition_perks to recipes table
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Step 1: Add nutrients column to ingredients
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS nutrients jsonb DEFAULT '[]'::jsonb;

-- Step 2: Add nutrition_perks column to recipes
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS nutrition_perks text[] DEFAULT '{}';

-- Step 3: Update each ingredient with nutrient data
-- Nutrient format: [{ "name": "Vitamin C", "amount": "high" }]

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"high"},
  {"name":"Quercetin","amount":"moderate"},
  {"name":"Pectin","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"}
]'::jsonb WHERE name = 'Apple';

UPDATE ingredients SET nutrients = '[
  {"name":"Folate","amount":"high"},
  {"name":"Betaine","amount":"high"},
  {"name":"Iron","amount":"moderate"},
  {"name":"Nitrates","amount":"high"},
  {"name":"Potassium","amount":"moderate"}
]'::jsonb WHERE name = 'Beet';

UPDATE ingredients SET nutrients = '[
  {"name":"Beta-Carotene","amount":"high"},
  {"name":"Vitamin K","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"},
  {"name":"Biotin","amount":"moderate"}
]'::jsonb WHERE name = 'Carrot';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin K","amount":"high"},
  {"name":"Sodium","amount":"moderate"},
  {"name":"Folate","amount":"moderate"},
  {"name":"Phthalides","amount":"moderate"}
]'::jsonb WHERE name = 'Celery';

UPDATE ingredients SET nutrients = '[
  {"name":"Silica","amount":"high"},
  {"name":"Vitamin K","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"},
  {"name":"Cucurbitacins","amount":"moderate"}
]'::jsonb WHERE name = 'Cucumber';

UPDATE ingredients SET nutrients = '[
  {"name":"Gingerols","amount":"high"},
  {"name":"Shogaols","amount":"high"},
  {"name":"Magnesium","amount":"moderate"},
  {"name":"Vitamin B6","amount":"moderate"}
]'::jsonb WHERE name = 'Ginger';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin K","amount":"high"},
  {"name":"Vitamin C","amount":"high"},
  {"name":"Lutein","amount":"high"},
  {"name":"Calcium","amount":"moderate"},
  {"name":"Iron","amount":"moderate"}
]'::jsonb WHERE name = 'Kale';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"high"},
  {"name":"Citric Acid","amount":"high"},
  {"name":"Flavonoids","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"}
]'::jsonb WHERE name = 'Lemon';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"high"},
  {"name":"Limonene","amount":"high"},
  {"name":"Folate","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"}
]'::jsonb WHERE name = 'Lime';

UPDATE ingredients SET nutrients = '[
  {"name":"Beta-Carotene","amount":"high"},
  {"name":"Vitamin C","amount":"high"},
  {"name":"Potassium","amount":"high"},
  {"name":"Folate","amount":"moderate"}
]'::jsonb WHERE name = 'Mango';

UPDATE ingredients SET nutrients = '[
  {"name":"Menthol","amount":"high"},
  {"name":"Rosmarinic Acid","amount":"moderate"},
  {"name":"Vitamin C","amount":"moderate"},
  {"name":"Iron","amount":"moderate"}
]'::jsonb WHERE name = 'Mint';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"high"},
  {"name":"Flavanones","amount":"high"},
  {"name":"Folate","amount":"moderate"},
  {"name":"Potassium","amount":"moderate"}
]'::jsonb WHERE name = 'Orange';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"high"},
  {"name":"Bromelain","amount":"high"},
  {"name":"Manganese","amount":"high"},
  {"name":"Thiamine","amount":"moderate"}
]'::jsonb WHERE name = 'Pineapple';

UPDATE ingredients SET nutrients = '[
  {"name":"Iron","amount":"high"},
  {"name":"Vitamin K","amount":"high"},
  {"name":"Folate","amount":"high"},
  {"name":"Lutein","amount":"moderate"},
  {"name":"Magnesium","amount":"moderate"}
]'::jsonb WHERE name = 'Spinach';

UPDATE ingredients SET nutrients = '[
  {"name":"Ellagic Acid","amount":"high"},
  {"name":"Vitamin C","amount":"high"},
  {"name":"Anthocyanins","amount":"high"},
  {"name":"Folate","amount":"moderate"}
]'::jsonb WHERE name = 'Strawberry';

UPDATE ingredients SET nutrients = '[
  {"name":"Curcumin","amount":"high"},
  {"name":"Turmerones","amount":"moderate"},
  {"name":"Iron","amount":"moderate"},
  {"name":"Manganese","amount":"moderate"}
]'::jsonb WHERE name = 'Turmeric';

UPDATE ingredients SET nutrients = '[
  {"name":"Lycopene","amount":"high"},
  {"name":"Citrulline","amount":"high"},
  {"name":"Potassium","amount":"high"},
  {"name":"Vitamin C","amount":"moderate"}
]'::jsonb WHERE name = 'Watermelon';

UPDATE ingredients SET nutrients = '[
  {"name":"Chlorophyll","amount":"high"},
  {"name":"Vitamin E","amount":"high"},
  {"name":"Iron","amount":"high"},
  {"name":"Selenium","amount":"moderate"}
]'::jsonb WHERE name = 'Wheatgrass';

UPDATE ingredients SET nutrients = '[
  {"name":"Vitamin C","amount":"moderate"},
  {"name":"Vitamin K","amount":"moderate"},
  {"name":"Folate","amount":"moderate"},
  {"name":"Boron","amount":"moderate"}
]'::jsonb WHERE name = 'Pear';

UPDATE ingredients SET nutrients = '[
  {"name":"Apigenin","amount":"high"},
  {"name":"Vitamin C","amount":"moderate"},
  {"name":"Iron","amount":"moderate"},
  {"name":"Folate","amount":"moderate"}
]'::jsonb WHERE name = 'Parsley';
