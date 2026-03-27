import type { KdsControl } from '@/shared/types/models/order';
import { ActionButton } from './action-button';
import {
  ListOrdered,
  Undo2,
  Activity,
  Settings,
  ChevronLeft,
  Clock,
} from 'lucide-react';

interface SidebarProps {
  openCount: number;
  controls: KdsControl[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  SHOW_SUMMARY: <ListOrdered className="h-5 w-5" />,
  RECALL_ORDER: <Undo2 className="h-5 w-5" />,
  VIEW_HOLDS: <Clock className="h-5 w-5" />,
  SHOW_METRICS: <Activity className="h-5 w-5" />,
  OPEN_SETTINGS: <Settings className="h-5 w-5" />,
};

export function Sidebar({ openCount, controls }: SidebarProps) {
  return (
    <aside
      className="
        fixed bottom-0 left-0 right-0 z-20
        flex lg:items-center gap-1 overflow-x-auto bg-gray-600 px-2 py-1
        lg:sticky lg:top-0 lg:bottom-auto lg:right-auto
        lg:h-screen lg:w-24 lg:shrink-0 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:overflow-x-visible lg:py-3
      "
      aria-label="KDS sidebar"
    >
      {/* Open order count */}
      <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-lg border bg-gray-100 text-gray-900 border-gray-600 px-3 py-2 lg:mb-2 lg:w-full lg:px-2">
        <span className="text-xl font-bold">{openCount}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">
          Open
        </span>
      </div>

      {/* Control buttons */}
      {controls.map(control => (
        <ActionButton
          key={control.id}
          icon={ICON_MAP[control.action]}
          label={control.label}
        />
      ))}

      {/* Spacer on desktop. On mobile, navigation arrow hides */}
      <div className="hidden flex-1 lg:block" />

      {/* Collapse / navigate button */}
      <button
        type="button"
        className="hidden shrink-0 rounded-full border border-gray-600 p-2 text-gray-400 hover:text-white lg:block"
        aria-label="Collapse sidebar"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </aside>
  );
}
