import type { ConfigSectionId } from '@/shared/types/models/config';

const FULFILLMENT_LABELS: Record<ConfigSectionId, string> = {
  FOR_HERE: 'For Here',
  DRIVE_THRU: 'Drive Thru',
  CURBSIDE: 'Curb Side',
  TOGO: 'To Go',
  DELIVERY: 'Delivery',
  PICKUP: 'Pickup',
};

export function getFulfillmentLabel(type: ConfigSectionId | string): string {
  return FULFILLMENT_LABELS[type as ConfigSectionId] ?? type;
}
