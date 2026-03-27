import type { Order } from '@/shared/types/models/order';
import { dummyKDSResponse } from './kds-data';

// Dummy implementation
export const getOrders = (): Order => {
  return dummyKDSResponse;
};
