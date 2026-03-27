import type { Order } from '@/shared/types/models/order';

// --- State ---

export interface KdsState {
  orders: Order[];
  /** IDs of orders currently playing exit animation */
  exitingOrderIds: Set<string>;
  /** IDs of orders that have been fully bumped/removed */
  bumpedOrderIds: Set<string>;
}

// --- Actions ---

export type KdsAction =
  | { type: 'INIT_ORDERS'; payload: Order[] }
  | { type: 'BUMP_ORDER'; payload: string }
  | { type: 'FINISH_BUMP'; payload: string };

// --- Reducer ---

export function kdsReducer(state: KdsState, action: KdsAction): KdsState {
  switch (action.type) {
    case 'INIT_ORDERS':
      return { ...state, orders: action.payload };

    case 'BUMP_ORDER': {
      // Begin exit animation — add to exiting set
      const exitingOrderIds = new Set(state.exitingOrderIds);
      exitingOrderIds.add(action.payload);
      return { ...state, exitingOrderIds };
    }

    case 'FINISH_BUMP': {
      // Animation complete — move from exiting to bumped
      const exitingOrderIds = new Set(state.exitingOrderIds);
      exitingOrderIds.delete(action.payload);
      const bumpedOrderIds = new Set(state.bumpedOrderIds);
      bumpedOrderIds.add(action.payload);
      return { ...state, exitingOrderIds, bumpedOrderIds };
    }

    default:
      return state;
  }
}

export const initialKdsState: KdsState = {
  orders: [],
  exitingOrderIds: new Set(),
  bumpedOrderIds: new Set(),
};
