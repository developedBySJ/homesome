// --- Enums ---

export type Timeliness = 'ON_TIME' | 'AT_RISK' | 'LATE';
export type FulfillmentType = 'FOR_HERE' | 'CURBSIDE' | 'TOGO';
export type OrderStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ItemCategory = 'BEVERAGE' | 'FOOD';
export type ItemStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type OrderSource = 'POS' | 'MOBILE_APP' | 'WEB';
export type OrderPriority = 'NORMAL' | 'RUSH';

// --- Models ---

export interface OrderModifier {
  name: string;
  type: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  name: string;
  category: ItemCategory;
  status: ItemStatus;
  modifiers: OrderModifier[];
  notes: string | null;
}

export interface PickupDetails {
  vehicleColor: string;
  vehicleType: string;
  spotNumber: string;
}

export interface Order {
  id: string;
  ticketNumber: number;
  customerName: string;
  createdAt: string;
  elapsedTimeSec: number;
  displayElapsed: string;
  timeliness: Timeliness;
  status: OrderStatus;
  fulfillmentType: FulfillmentType;
  source: OrderSource;
  priority: OrderPriority;
  itemCount: number;
  items: OrderItem[];
  pickupDetails?: PickupDetails;
}

// --- Section Grouping ---

export interface OrderSection {
  type: FulfillmentType;
  label: string;
  orders: Order[];
}

// --- API Response Shape ---

export interface KdsControl {
  id: string;
  label: string;
  action: string;
}

export interface KdsResponse {
  store: {
    id: string;
    name: string;
    timezone: string;
  };
  kds: {
    openOrdersCount: number;
    viewMode: string;
    groupedSections: FulfillmentType[];
    generatedAt: string;
  };
  statusConfig: Record<Timeliness, { headerColor: string }>;
  controls: KdsControl[];
  orders: Order[];
}
