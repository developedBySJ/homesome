import type { FulfillmentType } from '@/shared/types/models/order';

const FULFILLMENT_LABELS: Record<FulfillmentType, string> = {
  FOR_HERE: 'For Here',
  CURBSIDE: 'Curbside',
  TOGO: 'To Go',
};

export function getFulfillmentLabel(type: FulfillmentType): string {
  return FULFILLMENT_LABELS[type];
}
