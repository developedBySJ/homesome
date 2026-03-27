import type { OrderSection } from '@/shared/types/models/order';
import { VerticalSectionLabel } from './vertical-section-label';
import { OrderCard } from './order-card';
import { getOrderElapsedTime } from '@/shared/hooks/use-order-elapsed-time';

interface SectionGroupProps {
  sections: OrderSection[];
  now: number;
  exitingIds: Set<string>;
  onBump: (orderId: string) => void;
  onAnimationEnd: (orderId: string) => void;
}

export function SectionGroup({
  sections,
  now,
  exitingIds,
  onBump,
  onAnimationEnd,
}: SectionGroupProps) {
  const combinedLabel = sections.map(s => s.label).join(', ');
  const allOrders = sections.flatMap(s => s.orders);
  const isEmpty = allOrders.length === 0;

  return (
    <section
      aria-label={`${combinedLabel} orders`}
      className="flex items-stretch flex-col flex-1"
    >
      {/* Mobile combined header */}
      <h2 className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-300 lg:hidden">
        {combinedLabel}
      </h2>

      <div className="flex flex-1">
        <VerticalSectionLabel label={combinedLabel} />

        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center px-4 py-6">
            <p className="text-lg font-bold text-gray-900">No orders</p>
          </div>
        ) : (
          <div className="flex flex-1 items-start gap-3 overflow-x-auto px-2 py-2 lg:overflow-visible">
            {allOrders.map(order => (
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
