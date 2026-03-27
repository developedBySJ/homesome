import { createContext, useContext } from 'react';
import type { KdsState, KdsAction } from './kds-reducer';
import { initialKdsState } from './kds-reducer';

interface KdsContextValue {
  state: KdsState;
  dispatch: React.Dispatch<KdsAction>;
}

export const KdsContext = createContext<KdsContextValue>({
  state: initialKdsState,
  dispatch: () => {},
});

export function useKds() {
  return useContext(KdsContext);
}
