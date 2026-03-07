"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

type IngredientFilter = 'All' | 'Fruits' | 'Veggies' | 'Boosts';

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

const FILTERS: IngredientFilter[] = ['All', 'Fruits', 'Veggies', 'Boosts'];

export default function FindPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<IngredientFilter>('All');
  const router = useRouter();

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleSearch = (name: string) => {
    if (!selected.includes(name)) setSelected(prev => [...prev, name]);
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      router.push(`/results?ingredients=${encodeURIComponent(selected.join(','))}`);
    }
  };

  const showFruits = activeFilter === 'All' || activeFilter === 'Fruits';
  const showVeggies = activeFilter === 'All' || activeFilter === 'Veggies';
  const showBoosts = activeFilter === 'All' || activeFilter === 'Boosts';

  return (
    <main className="flex flex-col items-center p-6 max-w-lg mx-auto min-h-screen">

      <div className="w-full mb-6 mt-4">
        <h1 className="text-2xl font-black text-gray-900 leading-tight">What's in your fridge?</h1>
        <p className="text-gray-400 text-sm">Select ingredients to find the perfect juice.</p>
      </div>

      {/* Filter chips */}
      <div className="w-full flex flex-wrap gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${activeFilter === f ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Selected ingredients */}
      {selected.length > 0 && (
        <div className="w-full mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-2">Selected</p>
          <div className="flex flex-wrap gap-2">
            {selected.map(item => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className="px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold shadow-sm hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                {item} ✕
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full mb-8 z-10">
        <SearchBar onAdd={handleSearch} />
      </div>

      {/* Fruits */}
      {showFruits && (
        <div className="w-full mb-8">
          <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Fruits</h3>
          <div className="flex flex-wrap gap-2">
            {FRUITS.map(item => (
              <button
                key={item.name}
                onClick={() => toggle(item.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 border ${
                  selected.includes(item.name)
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white border-gray-100 hover:border-green-500 hover:text-green-600'
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Veggies */}
      {showVeggies && (
        <div className="w-full mb-8">
          <h3 className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Veggies</h3>
          <div className="flex flex-wrap gap-2">
            {VEGGIES.map(item => (
              <button
                key={item.name}
                onClick={() => toggle(item.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 border ${
                  selected.includes(item.name)
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white border-gray-100 hover:border-green-500 hover:text-green-600'
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Boosts */}
      {showBoosts && (
        <div className="w-full mb-12">
          <h3 className="text-[10px] font-black text-purple-500 mb-3 uppercase tracking-widest">Boosts</h3>
          <div className="flex flex-wrap gap-2">
            {BOOSTS.map(item => (
              <button
                key={item.name}
                onClick={() => toggle(item.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 border ${
                  selected.includes(item.name)
                    ? 'bg-purple-500 text-white border-purple-500'
                    : 'bg-white border-purple-100 hover:border-purple-500 hover:text-purple-600'
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="w-full mt-auto sticky bottom-6 pt-4">
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className={`w-full font-black text-lg py-4 rounded-2xl shadow-lg transition-all active:scale-95 ${
            selected.length > 0
              ? 'bg-green-600 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selected.length > 0 ? "Let's Juice!" : 'Add ingredients first'}
        </button>
      </div>

    </main>
  );
}
