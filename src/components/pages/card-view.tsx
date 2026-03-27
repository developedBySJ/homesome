import { useEffect, useMemo } from 'react';
import { useKds } from '@/shared/state/kds-context';
import { useKdsNow } from '@/shared/hooks/use-kds-now';
import {
  selectGroupedSections,
  selectOpenOrderCount,
} from '@/shared/state/kds-selectors';
import { getKdsData } from '@/data/api/rest/order';
import { Sidebar } from '@/components/ui/sidebar';
import { SectionGroup } from '@/components/ui/section-group';
import ConfigPage from '@/components/pages/config-page';

export default function CardViewPage() {
  const { state, dispatch } = useKds();
  const now = useKdsNow();

  const kdsData = getKdsData();

  useEffect(() => {
    dispatch({ type: 'INIT_ORDERS', payload: kdsData.orders });
  }, [dispatch, kdsData.orders]);

  const { top, bottom } = useMemo(
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

  function handleSidebarAction(action: string) {
    if (action === 'OPEN_SETTINGS') {
      dispatch({ type: 'OPEN_CONFIG' });
    }
  }

  const hasTop = top.length > 0;
  const hasBottom = bottom.length > 0;

  return (
    <div className="flex h-screen flex-col bg-gray-500 lg:flex-row">
      <Sidebar
        openCount={openCount}
        controls={kdsData.controls}
        onAction={handleSidebarAction}
      />

      <main className="flex flex-1 flex-col overflow-hidden pb-24 lg:pb-0">
        {hasTop && (
          <div className={`flex overflow-y-auto p-2 ${hasBottom ? 'h-1/2' : 'h-full'}`}>
            <SectionGroup
              sections={top}
              now={now}
              exitingIds={state.exitingOrderIds}
              onBump={handleBump}
              onAnimationEnd={handleAnimationEnd}
            />
          </div>
        )}

        {hasTop && hasBottom && (
          <div className="border-t border-gray-600" />
        )}

        {hasBottom && (
          <div className={`flex overflow-y-auto p-2 ${hasTop ? 'h-1/2' : 'h-full'}`}>
            <SectionGroup
              sections={bottom}
              now={now}
              exitingIds={state.exitingOrderIds}
              onBump={handleBump}
              onAnimationEnd={handleAnimationEnd}
            />
          </div>
        )}
      </main>

      {state.configOpen && <ConfigPage />}
    </div>
  );
}
