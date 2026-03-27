export type Order = {
  store: {
    id: string;
    name: string;
    timezone: string;
  };
  kds: {
    openOrdersCount: number;
    viewMode: string;
    groupedSections: Array<string>;
    generatedAt: string;
  };
  statusConfig: {
    ON_TIME: {
      headerColor: string;
    };
    AT_RISK: {
      headerColor: string;
    };
    LATE: {
      headerColor: string;
    };
  };
  controls: Array<{
    id: string;
    label: string;
    action: string;
  }>;
  orders: Array<{
    id: string;
    ticketNumber: number;
    customerName: string;
    createdAt: string;
    elapsedTimeSec: number;
    displayElapsed: string;
    timeliness: string;
    status: string;
    fulfillmentType: string;
    source: string;
    priority: string;
    itemCount: number;
    items: Array<{
      id: string;
      quantity: number;
      name: string;
      category: string;
      status: string;
      modifiers: Array<{
        name: string;
        type: string;
      }>;
      notes: string | null;
    }>;
    pickupDetails?: {
      vehicleColor: string;
      vehicleType: string;
      spotNumber: string;
    };
  }>;
};
