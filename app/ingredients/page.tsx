"use client";

import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const FRUITS = [
  { name: 'Apple', icon: '🍏' },
  { name: 'Mango', icon: '🥭' },
  { name: 'Orange', icon: '🍊' },
  { name: 'Pear', icon: '🍐' },
  { name: 'Pineapple', icon: '🍍' },
  { name: 'Strawberry', icon: '🍓' },
  { name: 'Watermelon', icon: '🍉' },
];

const VEGGIES = [
  { name: 'Beet', icon: '🟣' },
  { name: 'Carrot', icon: '🥕' },
  { name: 'Celery', icon: '🥬' },
  { name: 'Cucumber', icon: '🥒' },
  { name: 'Kale', icon: '🥦' },
  { name: 'Parsley', icon: '🌿' },
  { name: 'Spinach', icon: '🍃' },
  { name: 'Wheatgrass', icon: '🌾' },
];

const BOOSTS = [
  { name: 'Ginger', icon: '🫚' },
  { name: 'Lemon', icon: '🍋' },
  { name: 'Lime', icon: '🟢' },
  { name: 'Mint', icon: '🍃' },
  { name: 'Turmeric', icon: '🟡' },
];

export default function IngredientsPage() {
  const router = useRouter();

  const navigate = (name: string) => {
    router.push(`/ingredients/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <main className="flex flex-col items-center p-6 max-w-lg md:max-w-2xl mx-auto min-h-screen">

      <div className="w-full mt-8 mb-6">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">Juicy Ingredients</h1>
        <p className="text-gray-500 text-sm">Recipes always start with fresh ingredients. Get inspired and choose one to see all recipes that use it.</p>
      </div>

      <div className="w-full mb-8 z-10">
        <SearchBar onAdd={navigate} />
      </div>

      {/* Fruits */}
      <div className="w-full mb-8">
        <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Fruits</h3>
        <div className="flex flex-wrap gap-2">
          {FRUITS.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.name)}
              className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium shadow-sm hover:border-green-500 hover:text-green-600 transition-all active:scale-95"
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Veggies */}
      <div className="w-full mb-8">
        <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Veggies</h3>
        <div className="flex flex-wrap gap-2">
          {VEGGIES.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.name)}
              className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium shadow-sm hover:border-green-500 hover:text-green-600 transition-all active:scale-95"
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Boosts */}
      <div className="w-full mb-12">
        <h3 className="text-[10px] font-black text-purple-500 mb-3 uppercase tracking-widest">Boosts</h3>
        <div className="flex flex-wrap gap-2">
          {BOOSTS.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.name)}
              className="px-4 py-2 bg-white border border-purple-100 rounded-full text-sm font-medium shadow-sm hover:border-purple-500 hover:text-purple-600 transition-all active:scale-95"
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </div>

    </main>
  );
}
