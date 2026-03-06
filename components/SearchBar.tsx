"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SearchBarProps {
  onAdd: (ingredient: string) => void;
}

export default function SearchBar({ onAdd }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      const { data } = await supabase
        .from('ingredients')
        .select('name')
        .order('name');
      if (data) setAllIngredients(data.map(i => i.name));
    }
    fetchIngredients();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = allIngredients.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If they hit Enter, add whatever they typed!
    if (e.key === 'Enter' && query.trim() !== '') {
      onAdd(query.trim());
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Type an ingredient (e.g., Carrot)" 
        className="w-full px-4 py-3 bg-white border-2 border-green-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 text-gray-900 placeholder-gray-400 font-medium transition-all shadow-sm"
      />
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden text-left">
          {suggestions.map((item, index) => (
            <li 
              key={index} 
              className="px-4 py-3 hover:bg-green-50 cursor-pointer text-gray-700 font-medium border-b border-gray-50 last:border-b-0 transition-colors"
              onClick={() => {
                onAdd(item); // Send the item up to the main page!
                setQuery('');
                setSuggestions([]);
              }}
            >
              + {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}