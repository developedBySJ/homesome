import type { KdsResponse } from '@/shared/types/models/order';
import { dummyKDSResponse } from './kds-data';

export function getKdsData(): KdsResponse {
  return dummyKDSResponse as KdsResponse;
}
