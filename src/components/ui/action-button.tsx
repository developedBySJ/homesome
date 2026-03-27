import type { ReactNode } from 'react';

interface ActionButtonProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

export function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-center gap-1.5 rounded-lg bg-gray-100 px-2 py-3 text-gray-900 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:my-0.5"
      aria-label={label}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-xs font-semibold uppercase leading-tight tracking-wider">
        {label}
      </span>
    </button>
  );
}
