import type { PropsWithChildren } from 'react';

export function AppShellLayout({ children }: PropsWithChildren) {
  return <div className="h-screen w-screen overflow-y-auto">{children}</div>;
}
