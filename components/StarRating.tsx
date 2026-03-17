"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StarRatingProps {
  recipeId: string;
  initialRating: number;
  totalRatings: number;
}

function StarBar({ filled, half }: { filled: boolean; half: boolean }) {
  if (filled) {
    return (
      <svg className="w-4 h-4 text-[#fbbc04]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  if (half) {
    return (
      <svg className="w-4 h-4 text-[#fbbc04]" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#fbbc04" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function renderStars(rating: number) {
  return [1, 2, 3, 4, 5].map((star) => {
    const filled = rating >= star;
    const half = !filled && rating >= star - 0.5;
    return <StarBar key={star} filled={filled} half={half} />;
  });
}

export default function StarRating({ recipeId, initialRating, totalRatings }: StarRatingProps) {
  const storageKey = `rated_${recipeId}`;
  const savedRating = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;

  const [userRating, setUserRating] = useState(savedRating ? Number(savedRating) : 0);
  const [hasRated, setHasRated] = useState(!!savedRating);
  const [hovered, setHovered] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  const displayRating = initialRating > 0 ? initialRating : 0;
  const displayCount = totalRatings;

  const handleRate = async (stars: number) => {
    if (hasRated) return;
    setUserRating(stars);
    setHasRated(true);
    setShowPicker(false);
    localStorage.setItem(storageKey, String(stars));

    const { error } = await supabase.rpc('rate_recipe', { r_id: recipeId, new_rating: stars });
    if (error) {
      console.error('Error saving rating:', error);
      setHasRated(false);
      setUserRating(0);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1.5">
      {/* Google Maps-style aggregate display */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-800 leading-none">
          {displayRating > 0 ? displayRating.toFixed(1) : '—'}
        </span>
        <div className="flex items-center gap-0.5">
          {renderStars(displayRating)}
        </div>
        <span className="text-sm text-gray-500">
          {displayCount > 0 ? `${displayCount.toLocaleString()} ${displayCount === 1 ? 'rating' : 'ratings'}` : 'No ratings yet'}
        </span>
      </div>

      {/* Rate this juice — inline compact */}
      {!hasRated ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Rate this juice:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => handleRate(star)}
                className="p-0.5 rounded transition-transform hover:scale-110"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <svg
                  className={`w-5 h-5 transition-colors ${star <= (hovered || 0) ? 'text-[#fbbc04]' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <span className="text-xs text-green-600 font-medium">
          You rated this {userRating} star{userRating !== 1 ? 's' : ''} — thanks!
        </span>
      )}
    </div>
  );
}
