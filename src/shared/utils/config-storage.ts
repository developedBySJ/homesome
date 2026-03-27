import type { KdsConfig } from '@/shared/types/models/config';
import { DEFAULT_KDS_CONFIG } from '@/shared/types/models/config';

const STORAGE_KEY = 'kds-config';

export function loadConfig(): KdsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_KDS_CONFIG;

    const parsed = JSON.parse(raw);
    // Merge with defaults to handle missing/new fields safely
    return {
      viewMode: parsed.viewMode ?? DEFAULT_KDS_CONFIG.viewMode,
      theme: parsed.theme ?? DEFAULT_KDS_CONFIG.theme,
      sections: Array.isArray(parsed.sections)
        ? mergePersistedSections(parsed.sections)
        : DEFAULT_KDS_CONFIG.sections,
    };
  } catch {
    return DEFAULT_KDS_CONFIG;
  }
}

export function saveConfig(config: KdsConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Silently fail — localStorage might be full or disabled
  }
}

/**
 * Reconcile persisted sections with defaults:
 * - keep user's visibility/position for known section IDs
 * - add new sections from defaults that weren't persisted
 * - drop unknown section IDs
 */
function mergePersistedSections(
  persisted: Array<Record<string, unknown>>
): KdsConfig['sections'] {
  const persistedMap = new Map<string, Record<string, unknown>>();
  for (const s of persisted) {
    if (typeof s.id === 'string') persistedMap.set(s.id, s);
  }

  return DEFAULT_KDS_CONFIG.sections.map(def => {
    const saved = persistedMap.get(def.id);
    if (!saved) return def;
    return {
      ...def,
      visible: typeof saved.visible === 'boolean' ? saved.visible : def.visible,
      position:
        saved.position === 'top' || saved.position === 'bottom'
          ? saved.position
          : def.position,
    };
  });
}
