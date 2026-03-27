import type { Order } from '@/shared/types/models/order';
import type { KdsConfig, ViewMode, KdsTheme, SectionPosition, ConfigSectionId } from '@/shared/types/models/config';
import { DEFAULT_KDS_CONFIG } from '@/shared/types/models/config';

export interface KdsState {
  orders: Order[];
  exitingOrderIds: Set<string>;
  bumpedOrderIds: Set<string>;
  config: KdsConfig;
  configOpen: boolean;
}

export type KdsAction =
  | { type: 'INIT_ORDERS'; payload: Order[] }
  | { type: 'BUMP_ORDER'; payload: string }
  | { type: 'FINISH_BUMP'; payload: string }
  | { type: 'SET_CONFIG'; payload: KdsConfig }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_THEME'; payload: KdsTheme }
  | { type: 'TOGGLE_SECTION_VISIBLE'; payload: ConfigSectionId }
  | { type: 'SET_SECTION_POSITION'; payload: { id: ConfigSectionId; position: SectionPosition } }
  | { type: 'OPEN_CONFIG' }
  | { type: 'CLOSE_CONFIG' };

export function kdsReducer(state: KdsState, action: KdsAction): KdsState {
  switch (action.type) {
    case 'INIT_ORDERS':
      return { ...state, orders: action.payload };

    case 'BUMP_ORDER': {
      const exitingOrderIds = new Set(state.exitingOrderIds);
      exitingOrderIds.add(action.payload);
      return { ...state, exitingOrderIds };
    }

    case 'FINISH_BUMP': {
      const exitingOrderIds = new Set(state.exitingOrderIds);
      exitingOrderIds.delete(action.payload);
      const bumpedOrderIds = new Set(state.bumpedOrderIds);
      bumpedOrderIds.add(action.payload);
      return { ...state, exitingOrderIds, bumpedOrderIds };
    }

    case 'SET_CONFIG':
      return { ...state, config: action.payload };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        config: { ...state.config, viewMode: action.payload },
      };

    case 'SET_THEME':
      return {
        ...state,
        config: { ...state.config, theme: action.payload },
      };

    case 'TOGGLE_SECTION_VISIBLE':
      return {
        ...state,
        config: {
          ...state.config,
          sections: state.config.sections.map(s =>
            s.id === action.payload ? { ...s, visible: !s.visible } : s
          ),
        },
      };

    case 'SET_SECTION_POSITION':
      return {
        ...state,
        config: {
          ...state.config,
          sections: state.config.sections.map(s =>
            s.id === action.payload.id
              ? { ...s, position: action.payload.position }
              : s
          ),
        },
      };

    case 'OPEN_CONFIG':
      return { ...state, configOpen: true };

    case 'CLOSE_CONFIG':
      return { ...state, configOpen: false };

    default:
      return state;
  }
}

export const initialKdsState: KdsState = {
  orders: [],
  exitingOrderIds: new Set(),
  bumpedOrderIds: new Set(),
  config: DEFAULT_KDS_CONFIG,
  configOpen: false,
};
