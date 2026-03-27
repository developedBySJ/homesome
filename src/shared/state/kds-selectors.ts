import type { KdsState } from './kds-reducer';
import type { Order, OrderSection, FulfillmentType } from '@/shared/types/models/order';
import type { ConfigSectionId } from '@/shared/types/models/config';
import { getFulfillmentLabel } from '@/shared/utils/fulfillment';

export interface GroupedSections {
  top: OrderSection[];
  bottom: OrderSection[];
}

export function selectVisibleOrders(state: KdsState): Order[] {
  return state.orders.filter(o => !state.bumpedOrderIds.has(o.id));
}

export function selectOpenOrderCount(state: KdsState): number {
  return state.orders.filter(
    o => !state.bumpedOrderIds.has(o.id) && !state.exitingOrderIds.has(o.id)
  ).length;
}

/**
 * Groups visible orders into top/bottom section groups based on config.
 * Only sections that are visible AND present in data produce output.
 */
export function selectGroupedSections(
  state: KdsState,
  dataSectionOrder: FulfillmentType[]
): GroupedSections {
  const visible = selectVisibleOrders(state);
  const { sections: configSections } = state.config;

  const dataSections = new Set(dataSectionOrder);

  // Only include sections that are visible in config AND exist in data
  const activeSections = configSections.filter(
    s => s.visible && dataSections.has(s.id as unknown as FulfillmentType)
  );

  // Group orders by fulfillment type
  const grouped = new Map<FulfillmentType, Order[]>();
  for (const order of visible) {
    const list = grouped.get(order.fulfillmentType) ?? [];
    list.push(order);
    grouped.set(order.fulfillmentType, list);
  }

  function toOrderSection(s: typeof configSections[number]): OrderSection {
    return {
      type: s.id as unknown as FulfillmentType,
      label: getFulfillmentLabel(s.id as ConfigSectionId),
      orders: grouped.get(s.id as unknown as FulfillmentType) ?? [],
    };
  }

  return {
    top: activeSections.filter(s => s.position === 'top').map(toOrderSection),
    bottom: activeSections.filter(s => s.position === 'bottom').map(toOrderSection),
  };
}

export function selectIsExiting(state: KdsState, orderId: string): boolean {
  return state.exitingOrderIds.has(orderId);
}
