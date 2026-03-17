import { createClient } from '@supabase/supabase-js';

// Run AFTER: ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS nutrients jsonb DEFAULT '[]'::jsonb;

const supabase = createClient(
  'https://ejypnkyztcfvkkdkhuds.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeXBua3l6dGNmdmtrZGtodWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDY3MjAsImV4cCI6MjA4ODMyMjcyMH0.9xO7g17aePJUNyjUoYOJ4dOTQp3F9CI7NHEP2FFObfo'
);

const nutrients = {
  Apple:      [{ name:'Vitamin C',amount:'high' },{ name:'Quercetin',amount:'moderate' },{ name:'Pectin',amount:'moderate' },{ name:'Potassium',amount:'moderate' }],
  Beet:       [{ name:'Folate',amount:'high' },{ name:'Betaine',amount:'high' },{ name:'Iron',amount:'moderate' },{ name:'Nitrates',amount:'high' },{ name:'Potassium',amount:'moderate' }],
  Carrot:     [{ name:'Beta-Carotene',amount:'high' },{ name:'Vitamin K',amount:'moderate' },{ name:'Potassium',amount:'moderate' },{ name:'Biotin',amount:'moderate' }],
  Celery:     [{ name:'Vitamin K',amount:'high' },{ name:'Sodium',amount:'moderate' },{ name:'Folate',amount:'moderate' },{ name:'Phthalides',amount:'moderate' }],
  Cucumber:   [{ name:'Silica',amount:'high' },{ name:'Vitamin K',amount:'moderate' },{ name:'Potassium',amount:'moderate' },{ name:'Cucurbitacins',amount:'moderate' }],
  Ginger:     [{ name:'Gingerols',amount:'high' },{ name:'Shogaols',amount:'high' },{ name:'Magnesium',amount:'moderate' },{ name:'Vitamin B6',amount:'moderate' }],
  Kale:       [{ name:'Vitamin K',amount:'high' },{ name:'Vitamin C',amount:'high' },{ name:'Lutein',amount:'high' },{ name:'Calcium',amount:'moderate' },{ name:'Iron',amount:'moderate' }],
  Lemon:      [{ name:'Vitamin C',amount:'high' },{ name:'Citric Acid',amount:'high' },{ name:'Flavonoids',amount:'moderate' },{ name:'Potassium',amount:'moderate' }],
  Lime:       [{ name:'Vitamin C',amount:'high' },{ name:'Limonene',amount:'high' },{ name:'Folate',amount:'moderate' },{ name:'Potassium',amount:'moderate' }],
  Mango:      [{ name:'Beta-Carotene',amount:'high' },{ name:'Vitamin C',amount:'high' },{ name:'Potassium',amount:'high' },{ name:'Folate',amount:'moderate' }],
  Mint:       [{ name:'Menthol',amount:'high' },{ name:'Rosmarinic Acid',amount:'moderate' },{ name:'Vitamin C',amount:'moderate' },{ name:'Iron',amount:'moderate' }],
  Orange:     [{ name:'Vitamin C',amount:'high' },{ name:'Flavanones',amount:'high' },{ name:'Folate',amount:'moderate' },{ name:'Potassium',amount:'moderate' }],
  Pineapple:  [{ name:'Vitamin C',amount:'high' },{ name:'Bromelain',amount:'high' },{ name:'Manganese',amount:'high' },{ name:'Thiamine',amount:'moderate' }],
  Spinach:    [{ name:'Iron',amount:'high' },{ name:'Vitamin K',amount:'high' },{ name:'Folate',amount:'high' },{ name:'Lutein',amount:'moderate' },{ name:'Magnesium',amount:'moderate' }],
  Strawberry: [{ name:'Ellagic Acid',amount:'high' },{ name:'Vitamin C',amount:'high' },{ name:'Anthocyanins',amount:'high' },{ name:'Folate',amount:'moderate' }],
  Turmeric:   [{ name:'Curcumin',amount:'high' },{ name:'Turmerones',amount:'moderate' },{ name:'Iron',amount:'moderate' },{ name:'Manganese',amount:'moderate' }],
  Watermelon: [{ name:'Lycopene',amount:'high' },{ name:'Citrulline',amount:'high' },{ name:'Potassium',amount:'high' },{ name:'Vitamin C',amount:'moderate' }],
  Wheatgrass: [{ name:'Chlorophyll',amount:'high' },{ name:'Vitamin E',amount:'high' },{ name:'Iron',amount:'high' },{ name:'Selenium',amount:'moderate' }],
  Pear:       [{ name:'Vitamin C',amount:'moderate' },{ name:'Vitamin K',amount:'moderate' },{ name:'Folate',amount:'moderate' },{ name:'Boron',amount:'moderate' }],
  Parsley:    [{ name:'Apigenin',amount:'high' },{ name:'Vitamin C',amount:'moderate' },{ name:'Iron',amount:'moderate' },{ name:'Folate',amount:'moderate' }],
};

let updated = 0, failed = 0;
for (const [name, data] of Object.entries(nutrients)) {
  const { error } = await supabase.from('ingredients').update({ nutrients: data }).eq('name', name);
  if (error) { console.error(`FAILED: ${name}`, error.message); failed++; }
  else { console.log(`OK: ${name}`); updated++; }
}
console.log(`\nDone: ${updated} updated, ${failed} failed`);
