import { useEffect, useMemo } from 'react';
import { useKds } from '@/shared/state/kds-context';
import { useKdsNow } from '@/shared/hooks/use-kds-now';
import {
  selectGroupedSections,
  selectOpenOrderCount,
} from '@/shared/state/kds-selectors';
import { getKdsData } from '@/data/api/rest/order';
import { Sidebar } from '@/components/ui/sidebar';
import { SectionLane } from '@/components/ui/section-lane';

export default function CardViewPage() {
  const { state, dispatch } = useKds();
  const now = useKdsNow();

  const kdsData = getKdsData();

  useEffect(() => {
    dispatch({ type: 'INIT_ORDERS', payload: kdsData.orders });
  }, [dispatch, kdsData.orders]);

  // useMemo justified — grouping is O(n) and produces a new array,
  // only needs to recompute when state changes, not on every tick
  const sections = useMemo(
    () => selectGroupedSections(state, kdsData.kds.groupedSections),
    [state, kdsData.kds.groupedSections]
  );

  const openCount = selectOpenOrderCount(state);

  function handleBump(orderId: string) {
    dispatch({ type: 'BUMP_ORDER', payload: orderId });
  }

  function handleAnimationEnd(orderId: string) {
    dispatch({ type: 'FINISH_BUMP', payload: orderId });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-500 lg:flex-row">
      <Sidebar openCount={openCount} controls={kdsData.controls} />

      <main className="flex-1 space-y-1 overflow-y-auto p-2 pb-24 lg:pb-2">
        {sections.map(section => (
          <SectionLane
            key={section.type}
            type={section.type}
            label={section.label}
            orders={section.orders}
            now={now}
            exitingIds={state.exitingOrderIds}
            onBump={handleBump}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </main>
    </div>
  );
}
