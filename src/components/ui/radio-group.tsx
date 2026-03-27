interface RadioGroupOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupProps<T extends string> {
  name: string;
  options: RadioGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string>({
  name,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <div className="flex items-center gap-4" role="radiogroup" aria-label={name}>
      {options.map(option => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600"
        >
          <span>{option.label}:</span>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 cursor-pointer accent-blue-600"
          />
        </label>
      ))}
    </div>
  );
}
