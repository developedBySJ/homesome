import type { Order } from '@/shared/types/models/order';
import { OrderCardHeader } from './order-card-header';
import { OrderItemsList } from './order-items-list';
import { VehicleInfo } from './vehicle-info';
import { Badge } from './badge';
import { getFulfillmentLabel } from '@/shared/utils/fulfillment';
import { Ellipsis } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  elapsed: string;
  isExiting: boolean;
  onBump: (orderId: string) => void;
  onAnimationEnd: (orderId: string) => void;
}

const BADGE_VARIANT: Record<string, 'forhere' | 'curbside' | 'togo'> = {
  FOR_HERE: 'forhere',
  CURBSIDE: 'curbside',
  TOGO: 'togo',
};

export function OrderCard({
  order,
  elapsed,
  isExiting,
  onBump,
  onAnimationEnd,
}: OrderCardProps) {
  return (
    <div
      className={`flex w-52 shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ${
        isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}
      onTransitionEnd={() => {
        if (isExiting) onAnimationEnd(order.id);
      }}
      aria-label={`Order for ${order.customerName}`}
    >
      <OrderCardHeader
        customerName={order.customerName}
        createdAt={order.createdAt}
        elapsed={elapsed}
        timeliness={order.timeliness}
        onBump={() => onBump(order.id)}
      />

      {/* Action row */}
      <div className="flex gap-1 items-center justify-between border-b border-gray-200 px-2 py-1.5">
        <button
          type="button"
          className="h-8 px-6 flex items-center justify-center rounded-md bg-gray-300 text-gray-900 transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          aria-label="More actions"
        >
          <Ellipsis className="h-4 w-4" />
        </button>
        <Badge
          label={getFulfillmentLabel(order.fulfillmentType)}
          variant={BADGE_VARIANT[order.fulfillmentType]}
          className="flex-1"
        />
      </div>

      {/* Items */}
      <OrderItemsList items={order.items} />

      {/* Curbside vehicle info */}
      {order.pickupDetails && <VehicleInfo details={order.pickupDetails} />}
    </div>
  );
}
