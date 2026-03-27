interface BadgeProps {
  label: string;
  variant?: 'default' | 'curbside' | 'togo' | 'forhere';
  className?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-gray-600 text-white',
  forhere: 'bg-fuchsia-300 text-gray-900',
  curbside: 'bg-cyan-200 text-gray-900',
  togo: 'bg-amber-200 text-gray-900',
};

export function Badge({
  label,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`text-center inline-block h-8 rounded-md px-6 py-2 text-xs font-bold uppercase tracking-wider ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
