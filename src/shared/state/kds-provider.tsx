import { useReducer, useEffect, type PropsWithChildren } from 'react';
import { KdsContext } from './kds-context';
import { kdsReducer, initialKdsState } from './kds-reducer';
import { loadConfig, saveConfig } from '@/shared/utils/config-storage';

function createInitialState() {
  return { ...initialKdsState, config: loadConfig() };
}

export function KdsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(kdsReducer, null, createInitialState);

  // Persist config to localStorage whenever it changes
  useEffect(() => {
    saveConfig(state.config);
  }, [state.config]);

  return (
    <KdsContext.Provider value={{ state, dispatch }}>
      {children}
    </KdsContext.Provider>
  );
}
