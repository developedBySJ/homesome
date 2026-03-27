import type { PickupDetails as PickupDetailsType } from '@/shared/types/models/order';
import { DotIcon } from 'lucide-react';

interface VehicleInfoProps {
  details: PickupDetailsType;
}

export function VehicleInfo({ details }: VehicleInfoProps) {
  return (
    <div className="flex items-center border-t border-gray-200 px-3 py-2 text-xs text-gray-600">
      <span className="font-semibold">
        {details.vehicleColor} {details.vehicleType}
      </span>
      <DotIcon className="size-4" />
      <span>Spot {details.spotNumber}</span>
    </div>
  );
}
