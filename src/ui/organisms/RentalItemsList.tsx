import React from 'react';
import RentalItemCard from '../atoms/RentalItemCard';
import { RentalItem } from '@/API/models/RentalItem';

interface RentalItemsListProps {
  rentalItems: RentalItem[];
}

const RentalItemsList: React.FC<RentalItemsListProps> = ({ rentalItems: devices }) => {
  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      {devices.map((device) => (
        <RentalItemCard
          key={device.id}
          {...device}
        />
      ))}
    </div>
  );
};

export { RentalItemsList as DeviceList };
export default RentalItemsList;