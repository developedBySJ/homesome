import type { KdsState } from './kds-reducer';
import type { Order, OrderSection, FulfillmentType } from '@/shared/types/models/order';
import { getFulfillmentLabel } from '@/shared/utils/fulfillment';

/** Orders not yet bumped */
export function selectVisibleOrders(state: KdsState): Order[] {
  return state.orders.filter((o) => !state.bumpedOrderIds.has(o.id));
}

/** Count of orders that are neither bumped nor exiting */
export function selectOpenOrderCount(state: KdsState): number {
  return state.orders.filter(
    (o) => !state.bumpedOrderIds.has(o.id) && !state.exitingOrderIds.has(o.id),
  ).length;
}

/** Visible orders grouped by fulfillment type, maintaining section order */
export function selectGroupedSections(
  state: KdsState,
  sectionOrder: FulfillmentType[],
): OrderSection[] {
  const visible = selectVisibleOrders(state);

  // Group orders into a map by fulfillment type
  const grouped = new Map<FulfillmentType, Order[]>();
  for (const order of visible) {
    const list = grouped.get(order.fulfillmentType) ?? [];
    list.push(order);
    grouped.set(order.fulfillmentType, list);
  }

  // Produce all sections in configured order, even if empty
  return sectionOrder.map(type => ({
    type,
    label: getFulfillmentLabel(type),
    orders: grouped.get(type) ?? [],
  }));
}

export function selectIsExiting(state: KdsState, orderId: string): boolean {
  return state.exitingOrderIds.has(orderId);
}
