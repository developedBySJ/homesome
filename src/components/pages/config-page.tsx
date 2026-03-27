import { useKds } from '@/shared/state/kds-context';
import type { ViewMode, SectionPosition, ConfigSectionId } from '@/shared/types/models/config';
import { ViewModeCard } from '@/components/ui/view-mode-card';
import { ViewModeThumbnail } from '@/components/ui/view-mode-thumbnails';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { RadioGroup } from '@/components/ui/radio-group';
import { X, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const VIEW_MODES: { value: ViewMode; label: string; description: string }[] = [
  { value: 'tiled', label: 'Tiled', description: 'Most tickets on screen.' },
  { value: 'classic', label: 'Classic', description: 'Simple, clean.' },
  { value: 'split', label: 'Split', description: 'Organized by order type.' },
  { value: 'takeout', label: 'Take Out', description: 'Enables efficient order management.' },
];

const POSITION_OPTIONS: { value: SectionPosition; label: string }[] = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
];

export default function ConfigPage() {
  const { state, dispatch } = useKds();
  const { config } = state;

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_CONFIG' });
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-8 backdrop-blur-sm"
      onClick={e => {
        if (e.target === e.currentTarget) dispatch({ type: 'CLOSE_CONFIG' });
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Display Modes Settings"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-5 py-3 rounded-t-2xl">
          <span className="text-sm font-semibold text-gray-700">Fresh KDS</span>
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLOSE_CONFIG' })}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          <h1 className="mb-5 text-center text-xl font-semibold text-gray-900">
            Display Modes
          </h1>

          {/* KDS Theme Row */}
          <div className="mb-5 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="text-sm font-semibold text-gray-800">KDS Theme</span>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: 'SET_THEME',
                  payload: config.theme === 'light' ? 'dark' : 'light',
                })
              }
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <span className="capitalize">{config.theme}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Standard Screen Options */}
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Standard Screen Options
          </h2>

          <div className="mb-6 grid grid-cols-2 gap-3">
            {VIEW_MODES.map(mode => (
              <ViewModeCard
                key={mode.value}
                name="viewMode"
                label={mode.label}
                description={mode.description}
                selected={config.viewMode === mode.value}
                onSelect={() =>
                  dispatch({ type: 'SET_VIEW_MODE', payload: mode.value })
                }
                thumbnail={<ViewModeThumbnail mode={mode.value} />}
              />
            ))}
          </div>

          {/* Section Visibility */}
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {config.sections.map(section => (
              <div
                key={section.id}
                className="flex items-center gap-4 py-3"
              >
                <span className="min-w-[90px] text-sm font-semibold text-gray-800">
                  {section.label}
                </span>

                <div className="flex flex-1 items-center justify-end gap-5">
                  <ToggleSwitch
                    checked={section.visible}
                    onChange={() =>
                      dispatch({
                        type: 'TOGGLE_SECTION_VISIBLE',
                        payload: section.id,
                      })
                    }
                    label={`Toggle ${section.label} visibility`}
                  />

                  <RadioGroup
                    name={`${section.id}-position`}
                    options={POSITION_OPTIONS}
                    value={section.position}
                    onChange={(pos: SectionPosition) =>
                      dispatch({
                        type: 'SET_SECTION_POSITION',
                        payload: {
                          id: section.id as ConfigSectionId,
                          position: pos,
                        },
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
