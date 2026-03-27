export type ViewMode = 'tiled' | 'classic' | 'split' | 'takeout';
export type KdsTheme = 'light' | 'dark';
export type SectionPosition = 'top' | 'bottom';

export type ConfigSectionId =
  | 'FOR_HERE'
  | 'DRIVE_THRU'
  | 'CURBSIDE'
  | 'TOGO'
  | 'DELIVERY'
  | 'PICKUP';

export interface SectionConfig {
  id: ConfigSectionId;
  label: string;
  visible: boolean;
  position: SectionPosition;
}

export interface KdsConfig {
  viewMode: ViewMode;
  theme: KdsTheme;
  sections: SectionConfig[];
}

export const ALL_CONFIG_SECTIONS: SectionConfig[] = [
  { id: 'FOR_HERE', label: 'For Here', visible: true, position: 'top' },
  { id: 'DRIVE_THRU', label: 'Drive Thru', visible: true, position: 'bottom' },
  { id: 'CURBSIDE', label: 'Curb Side', visible: true, position: 'bottom' },
  { id: 'TOGO', label: 'To Go', visible: true, position: 'bottom' },
  { id: 'DELIVERY', label: 'Delivery', visible: true, position: 'bottom' },
  { id: 'PICKUP', label: 'Pickup', visible: true, position: 'bottom' },
];

export const DEFAULT_KDS_CONFIG: KdsConfig = {
  viewMode: 'split',
  theme: 'light',
  sections: ALL_CONFIG_SECTIONS,
};
