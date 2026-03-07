"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const BOOST_GOALS = [
  { name: 'Immunity', icon: '🛡️', ingredient: 'Turmeric', color: 'bg-amber-50 border-amber-200 text-amber-700', active: 'ring-4 ring-amber-400' },
  { name: 'Energy', icon: '⚡', ingredient: 'Ginger', color: 'bg-orange-50 border-orange-200 text-orange-700', active: 'ring-4 ring-orange-400' },
  { name: 'Digestion', icon: '🌿', ingredient: 'Mint', color: 'bg-green-50 border-green-200 text-green-700', active: 'ring-4 ring-green-400' },
  { name: 'Focus', icon: '🧠', ingredient: 'Lemon', color: 'bg-yellow-50 border-yellow-200 text-yellow-700', active: 'ring-4 ring-yellow-400' },
];

const TOP_FRUITS = [
  { name: 'Apple', icon: '🍏' }, { name: 'Orange', icon: '🍊' }, 
  { name: 'Pineapple', icon: '🍍' }, { name: 'Watermelon', icon: '🍉' }
];

const TOP_VEGGIES = [
  { name: 'Carrot', icon: '🥕' }, { name: 'Cucumber', icon: '🥒' },
  { name: 'Celery', icon: '🥬' }, { name: 'Spinach', icon: '🍃' }
];

export default function BoostPage() {
  const router = useRouter();
  
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [baseIngredient, setBaseIngredient] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  const handleSearchSubmit = () => {
    if (!selectedGoal) return;

    // We combine the Boost ingredient with their fridge items
    const allItems = [baseIngredient, ...selectedIngredients];
    const query = allItems.join(',');
    
    // Updated: Passing the 'goal' name in the URL so results can display the correct header
    router.push(`/results?ingredients=${encodeURIComponent(query)}&goal=${encodeURIComponent(selectedGoal)}`);
  };

  return (
    <main className="flex flex-col items-center p-6 max-w-lg mx-auto min-h-screen">
      
      {/* SECTION 1: THE GOAL */}
      <div className="w-full mb-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">1. How are we feeling?</h1>
        <div className="grid grid-cols-2 gap-3">
          {BOOST_GOALS.map((goal) => (
            <button
              key={goal.name}
              onClick={() => {
                setSelectedGoal(goal.name);
                setBaseIngredient(goal.ingredient);
              }}
              className={`p-4 rounded-3xl border-2 transition-all active:scale-95 text-center ${
                selectedGoal === goal.name ? goal.active + " border-transparent scale-105" : goal.color + " border-transparent opacity-60"
              }`}
            >
              <span className="text-3xl block mb-1">{goal.icon}</span>
              <p className="font-bold text-sm">{goal.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE FRIDGE */}
      <div className={`w-full transition-all duration-500 ${selectedGoal ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none translate-y-4'}`}>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">2. What's in your fridge?</h1>
        
        {selectedIngredients.length > 0 && (
          <div className="w-full mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex flex-wrap gap-2">
            {selectedIngredients.map((item) => (
              <span 
                key={item}
                onClick={() => handleRemoveIngredient(item)}
                className="px-3 py-1.5 bg-green-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer"
              >
                {item} ✕
              </span>
            ))}
          </div>
        )}

        <div className="w-full mb-8 z-10">
          <SearchBar onAdd={handleAddIngredient} />
        </div>

        <div className="w-full mb-8">
          <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Add some bases</h3>
          <div className="flex flex-wrap gap-2">
            {[...TOP_FRUITS, ...TOP_VEGGIES].map((item) => (
              <button 
                key={item.name}
                onClick={() => handleAddIngredient(item.name)}
                className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium shadow-sm hover:border-green-500 transition-all"
              >
                {item.icon} {item.name} +
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full mt-auto sticky bottom-6 pt-4">
        <button 
          onClick={handleSearchSubmit}
          disabled={!selectedGoal}
          className={`w-full font-bold text-lg py-4 rounded-2xl shadow-lg transition-all active:scale-95 ${
            selectedGoal 
              ? 'bg-green-600 text-white cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedGoal ? `Get ${selectedGoal} Recipes` : "Pick a goal first"}
        </button>
      </div>

    </main>
  );
}