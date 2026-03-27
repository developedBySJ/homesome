import { formatElapsedTime } from '@/shared/utils/format-time';

/**
 * Derives a formatted elapsed time string from a creation timestamp
 * and the shared `now` tick. This is a pure function, not a hook —
 * it needs no state or effects of its own.
 */
export function getOrderElapsedTime(createdAt: string, now: number): string {
  const created = new Date(createdAt).getTime();
  const diffMs = Math.max(0, now - created);
  const diffSec = Math.floor(diffMs / 1000);
  return formatElapsedTime(diffSec);
}
