import type { OrderItem as OrderItemType } from '@/shared/types/models/order';

interface OrderItemsListProps {
  items: OrderItemType[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <ul className="space-y-2 px-3 py-2" role="list">
      {items.map(item => (
        <li key={item.id}>
          <div className="flex items-baseline gap-1.5">
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
              {item.quantity}
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {item.name}
            </span>
          </div>
          {item.modifiers.length > 0 && (
            <div className="ml-6 mt-0.5">
              {item.modifiers.map((mod, i) => (
                <span
                  key={`${mod.name}-${i}`}
                  className="block text-xs leading-snug text-emerald-600"
                >
                  {mod.name}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
