import { useReducer, type PropsWithChildren } from 'react';
import { KdsContext } from './kds-context';
import { kdsReducer, initialKdsState } from './kds-reducer';

export function KdsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(kdsReducer, initialKdsState);

  return (
    <KdsContext.Provider value={{ state, dispatch }}>
      {children}
    </KdsContext.Provider>
  );
}
