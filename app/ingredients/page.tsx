"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const TOP_FRUITS = [
  { name: 'Apple', icon: '🍏' }, { name: 'Orange', icon: '🍊' }, 
  { name: 'Pineapple', icon: '🍍' }, { name: 'Watermelon', icon: '🍉' }
];

const TOP_VEGGIES = [
  { name: 'Carrot', icon: '🥕' }, { name: 'Cucumber', icon: '🥒' },
  { name: 'Celery', icon: '🥬' }, { name: 'Spinach', icon: '🍃' }
];

const TOP_BOOSTS = [
  { name: 'Ginger', icon: '🫚' }, { name: 'Turmeric', icon: '🟡' },
  { name: 'Mint', icon: '🍃' }, { name: 'Lemon', icon: '🍋' }, { name: 'Lime', icon: '🟢' }
];

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (selectedIngredients.length > 0) {
      const query = selectedIngredients.join(',');
      router.push(`/results?ingredients=${encodeURIComponent(query)}`);
    }
  };

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  return (
    <main className="flex flex-col items-center p-6 max-w-md mx-auto min-h-screen">
      
      <div className="w-full mb-6 mt-4">
        <h1 className="text-2xl font-black text-gray-900 leading-tight">What's in your fridge?</h1>
        <p className="text-gray-400 text-sm">Select ingredients to find the perfect juice.</p>
      </div>

      {/* Selected Ingredients "Cart" */}
      {selectedIngredients.length > 0 && (
        <div className="w-full mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((item) => (
              <span 
                key={item}
                onClick={() => handleRemoveIngredient(item)}
                className="px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold shadow-sm cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                {item} ✕
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="w-full mb-8 z-10">
        <SearchBar onAdd={handleAddIngredient} />
      </div>

      {/* 1. Fruits Section */}
      <div className="w-full mb-8">
        <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Top Fruits</h3>
        <div className="flex flex-wrap gap-2">
          {TOP_FRUITS.map((fruit) => (
            <span 
              key={fruit.name}
              onClick={() => handleAddIngredient(fruit.name)}
              className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:border-green-500 hover:text-green-600 transition-all active:scale-95"
            >
              {fruit.icon} {fruit.name} +
            </span>
          ))}
        </div>
      </div>

      {/* 2. Veggies Section */}
      <div className="w-full mb-8">
        <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Top Veggies</h3>
        <div className="flex flex-wrap gap-2">
          {TOP_VEGGIES.map((veggie) => (
            <span 
              key={veggie.name}
              onClick={() => handleAddIngredient(veggie.name)}
              className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:border-green-500 hover:text-green-600 transition-all active:scale-95"
            >
              {veggie.icon} {veggie.name} +
            </span>
          ))}
        </div>
      </div>

      {/* 3. TOP BOOSTS (Back in Purple) */}
      <div className="w-full mb-12">
        <h3 className="text-[10px] font-black text-purple-500 mb-3 uppercase tracking-widest">Top Boosts</h3>
        <div className="flex flex-wrap gap-2">
          {TOP_BOOSTS.map((boost) => (
            <span 
              key={boost.name}
              onClick={() => handleAddIngredient(boost.name)}
              className="px-4 py-2 bg-white border border-purple-100 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:border-purple-500 hover:text-purple-600 transition-all active:scale-95"
            >
              {boost.icon} {boost.name} +
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full mt-auto sticky bottom-6 pt-4">
        <button 
          onClick={handleSearchSubmit}
          disabled={selectedIngredients.length === 0}
          className={`w-full font-black text-lg py-4 rounded-2xl shadow-lg transition-all active:scale-95 ${
            selectedIngredients.length > 0 
              ? 'bg-green-600 text-white cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedIngredients.length > 0 ? "Let's Juice!" : "Add ingredients first"}
        </button>
      </div>

    </main>
  );
}