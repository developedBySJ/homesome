import type { ViewMode } from '@/shared/types/models/config';

function TiledThumb() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
      <rect x="2" y="2" width="116" height="76" rx="4" fill="white" stroke="#ccc" strokeWidth="1.5" />
      <rect x="8" y="8" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="34" y="8" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="60" y="8" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="86" y="8" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="8" y="42" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="34" y="42" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="60" y="42" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="86" y="42" width="22" height="30" rx="2" fill="#9ca3af" />
      <circle cx="12" cy="12" r="2" fill="#d1d5db" />
    </svg>
  );
}

function ClassicThumb() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
      <rect x="2" y="2" width="116" height="76" rx="4" fill="white" stroke="#ccc" strokeWidth="1.5" />
      <rect x="30" y="6" width="28" height="68" rx="2" fill="#9ca3af" />
      <rect x="62" y="6" width="28" height="68" rx="2" fill="#9ca3af" />
      <rect x="94" y="6" width="20" height="68" rx="2" fill="#9ca3af" />
    </svg>
  );
}

function SplitThumb() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
      <rect x="2" y="2" width="116" height="76" rx="4" fill="white" stroke="#ccc" strokeWidth="1.5" />
      <rect x="8" y="6" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="34" y="6" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="60" y="6" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="86" y="6" width="22" height="30" rx="2" fill="#9ca3af" />
      <line x1="8" y1="40" x2="112" y2="40" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="8" y="44" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="34" y="44" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="60" y="44" width="22" height="30" rx="2" fill="#9ca3af" />
      <rect x="86" y="44" width="22" height="30" rx="2" fill="#9ca3af" />
    </svg>
  );
}

function TakeOutThumb() {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
      <rect x="2" y="2" width="116" height="76" rx="4" fill="white" stroke="#ccc" strokeWidth="1.5" />
      <rect x="8" y="10" width="90" height="8" rx="2" fill="#9ca3af" />
      <rect x="8" y="22" width="90" height="8" rx="2" fill="#9ca3af" />
      <rect x="8" y="34" width="90" height="8" rx="2" fill="#9ca3af" />
      <rect x="8" y="46" width="90" height="8" rx="2" fill="#9ca3af" />
      <rect x="8" y="58" width="70" height="8" rx="2" fill="#9ca3af" />
      <rect x="60" y="62" width="48" height="12" rx="3" fill="#d1d5db" />
    </svg>
  );
}

const THUMBNAILS: Record<ViewMode, () => React.ReactNode> = {
  tiled: TiledThumb,
  classic: ClassicThumb,
  split: SplitThumb,
  takeout: TakeOutThumb,
};

export function ViewModeThumbnail({ mode }: { mode: ViewMode }) {
  const Thumb = THUMBNAILS[mode];
  return <Thumb />;
}
