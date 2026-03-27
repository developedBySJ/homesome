import type { Timeliness } from '@/shared/types/models/order';
import { CircleX } from 'lucide-react';

interface OrderCardHeaderProps {
  customerName: string;
  createdAt: string;
  elapsed: string;
  timeliness: Timeliness;
  onBump: () => void;
}

const HEADER_COLORS: Record<Timeliness, string> = {
  ON_TIME: 'bg-emerald-400',
  AT_RISK: 'bg-amber-400',
  LATE: 'bg-red-400',
};

export function OrderCardHeader({
  customerName,
  createdAt,
  elapsed,
  timeliness,
  onBump,
}: OrderCardHeaderProps) {
  const time = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={`${HEADER_COLORS[timeliness]} flex w-full items-start justify-between gap-2 rounded-t-lg px-3 py-2`}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">
          {customerName}
        </p>
        <p className="text-xs text-gray-800">{time}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <button
          type="button"
          onClick={onBump}
          className="rounded-full p-0.5 text-gray-700/70 transition-colors hover:bg-black/10 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gray-800"
          aria-label={`Bump order for ${customerName}`}
        >
          <CircleX className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="whitespace-nowrap font-mono text-xs text-gray-800">
          {elapsed}
        </span>
      </div>
    </div>
  );
}
