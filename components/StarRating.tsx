"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StarRatingProps {
  recipeId: string;
  initialRating: number;
  totalRatings: number;
}

export default function StarRating({ recipeId, initialRating, totalRatings }: StarRatingProps) {
  const storageKey = `rated_${recipeId}`;
  const savedRating = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;

  const [rating, setRating] = useState(savedRating ? Number(savedRating) : 0);
  const [hasRated, setHasRated] = useState(!!savedRating);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const handleRate = async (stars: number) => {
    if (hasRated) return;
    
    setRating(stars);
    setHasRated(true);
    localStorage.setItem(storageKey, String(stars));

    const { error } = await supabase.rpc('rate_recipe', {
      r_id: recipeId,
      new_rating: stars
    });

    if (error) {
      console.error("Error saving rating:", error);
      setHasRated(false);
      setRating(0);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 bg-gray-50 p-4 rounded-3xl border border-gray-100 w-fit">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => !hasRated && setIsHovering(star)}
            onMouseLeave={() => !hasRated && setIsHovering(null)}
            onClick={() => handleRate(star)}
            className={`text-2xl transition-all duration-200 transform ${
              hasRated ? 'cursor-default' : 'cursor-pointer hover:scale-125'
            } ${
              star <= (isHovering || rating || initialRating) 
                ? 'grayscale-0' 
                : 'grayscale opacity-30'
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          {hasRated ? "Thanks for rating!" : "Rate this juice"}
        </span>
        {!hasRated && (
          <span className="text-[10px] font-bold text-gray-300">
            {totalRatings} {totalRatings === 1 ? 'Rating' : 'Ratings'} • {initialRating.toFixed(1)} Avg
          </span>
        )}
      </div>
    </div>
  );
}