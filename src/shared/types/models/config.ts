export interface KdsConfig {
  viewMode: 'grid' | 'list';
  autoRecallEnabled: boolean;
  bumpConfirmation: boolean;
  displayTimezone: string;
}

export const DEFAULT_KDS_CONFIG: KdsConfig = {
  viewMode: 'grid',
  autoRecallEnabled: false,
  bumpConfirmation: false,
  displayTimezone: 'America/Los_Angeles',
};
