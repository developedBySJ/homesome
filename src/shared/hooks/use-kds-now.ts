import { useState, useEffect } from 'react';

/**
 * Single global-ish ticking source.
 * Returns a `now` timestamp that updates every second.
 * All order cards share this one interval instead of each card
 * creating its own setInterval.
 */
export function useKdsNow(): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1_000);

    return () => clearInterval(id);
  }, []);

  return now;
}
