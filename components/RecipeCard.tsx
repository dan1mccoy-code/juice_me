import Link from 'next/link';

export interface CardIngredient {
  name: string;
  have?: boolean; // true = green (user has it), false/undefined = grey
}

interface RecipeCardProps {
  title: string;
  slug: string;
  source_type: string;
  rating_count: number;
  rating_sum: number;
  ingredients?: CardIngredient[];
}

export default function RecipeCard({
  title,
  slug,
  source_type,
  rating_count,
  rating_sum,
  ingredients,
}: RecipeCardProps) {
  const avg = rating_count > 0 ? (rating_sum / rating_count).toFixed(1) : '0.0';

  return (
    <Link
      href={`/recipe/${slug}`}
      className="block bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:border-green-200 active:scale-[0.98] transition-all"
    >
      {/* Row 1: Title + Rating */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="font-bold text-gray-900 leading-tight">{title}</p>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs">⭐</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
            {avg} ({rating_count})
          </span>
        </div>
      </div>

      {/* Row 2: Source badge */}
      <div className="mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${source_type === 'human' ? 'text-blue-500' : 'text-purple-500'}`}>
          {source_type === 'human' ? '🧑‍🍳 Human' : '🤖 AI'}
        </span>
      </div>

      {/* Row 3: Ingredient chips */}
      {ingredients && ingredients.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ingredients.map(ing => (
            <span
              key={ing.name}
              className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                ing.have
                  ? 'text-green-800 bg-green-100'
                  : 'text-gray-500 bg-gray-100'
              }`}
            >
              {ing.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
