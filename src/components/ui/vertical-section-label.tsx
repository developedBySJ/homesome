interface VerticalSectionLabelProps {
  label: string;
}

export function VerticalSectionLabel({ label }: VerticalSectionLabelProps) {
  return (
    <div className="hidden w-7 shrink-0 items-center justify-center rounded-sm bg-gray-600 lg:flex">
      <span
        className="block origin-center -rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-gray-200"
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  );
}
