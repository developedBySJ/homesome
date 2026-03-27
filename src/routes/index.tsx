// Keeping simple as we only has one page
// can be upgrades to react router for more robust setup

import { AppShellLayout } from '@/components/layouts/appshell';
import HomePage from '@/components/pages/home';

export const Routes = () => {
  return (
    <>
      <AppShellLayout>
        <HomePage />
      </AppShellLayout>
    </>
  );
};
