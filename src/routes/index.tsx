// Simple routing — single page for now.
// Can be upgraded to react-router for multi-page in stage 2.

import { AppShellLayout } from '@/components/layouts/app-shell';
import CardViewPage from '@/components/pages/card-view';

export function Routes() {
  return (
    <AppShellLayout>
      <CardViewPage />
    </AppShellLayout>
  );
}
