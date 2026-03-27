import type { Order, FulfillmentType } from '@/shared/types/models/order';
import { VerticalSectionLabel } from './vertical-section-label';
import { OrderCard } from './order-card';
import { getOrderElapsedTime } from '@/shared/hooks/use-order-elapsed-time';

interface SectionLaneProps {
  label: string;
  type: FulfillmentType;
  orders: Order[];
  now: number;
  exitingIds: Set<string>;
  onBump: (orderId: string) => void;
  onAnimationEnd: (orderId: string) => void;
}

export function SectionLane({
  label,
  orders,
  now,
  exitingIds,
  onBump,
  onAnimationEnd,
}: SectionLaneProps) {
  const isEmpty = orders.length === 0;

  return (
    <section aria-label={`${label} orders`} className="flex-1">
      {/* Mobile section header */}
      <h2 className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-300 lg:hidden">
        {label}
      </h2>

      <div className="flex min-h-[120px]">
        <VerticalSectionLabel label={label} />

        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center px-4 py-6">
            <p className="text-lg font-bold text-gray-900">No orders</p>
          </div>
        ) : (
          <div className="flex flex-1 items-start gap-3 overflow-x-auto px-2 py-2 lg:flex-wrap lg:overflow-visible">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                elapsed={getOrderElapsedTime(order.createdAt, now)}
                isExiting={exitingIds.has(order.id)}
                onBump={onBump}
                onAnimationEnd={onAnimationEnd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
