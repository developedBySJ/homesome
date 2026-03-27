import type { ReactNode } from 'react';

interface ViewModeCardProps {
  name: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  thumbnail: ReactNode;
}

export function ViewModeCard({
  name,
  label,
  description,
  selected,
  onSelect,
  thumbnail,
}: ViewModeCardProps) {
  return (
    <label
      className={`relative flex cursor-pointer flex-col items-center rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-blue-400 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onSelect}
        className="absolute right-3 top-3 h-4 w-4 cursor-pointer accent-blue-600"
      />
      <div className="mb-2 flex h-20 w-28 items-center justify-center">
        {thumbnail}
      </div>
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <span className="mt-0.5 text-center text-xs text-gray-500">
        {description}
      </span>
    </label>
  );
}
