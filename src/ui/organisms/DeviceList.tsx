import React from 'react';
import DeviceItem, { DeviceItemProps } from '../atoms/DeviceItem';

interface DeviceListProps {
  devices: DeviceItemProps[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      {devices.map((device) => (
        <DeviceItem
          key={device.id}
          {...device}
        />
      ))}
    </div>
  );
};

// Sample data that matches the image with simplified string prices
const sampleDevices: DeviceItemProps[] = [
  {
    id: '1',
    image: '/karcher.png',
    name: 'Myjka parowa Karcher SG 4/4',
    description: 'Skuteczne usuwa brud, tłuszcz i bakterie z różnych powierzchni, takich jak podłogi, płytki, armatura, a nawet tapicerka. Idealna do czyszczenia parą wodną, bez użycia detergentów.',
    dailyPrice: '70,00 zł',
    weekendPrice: '140,00 zł',
    transportPrice: '20,00 zł w jedną stronę',
  },
  {
    id: '2',
    image: '/makita.png',
    name: 'Ręczna pilarka tarczowa akumulatorowa LXT® DHS680 (piła tarczowa) + tarcza do drewna',
    description: 'Makita ipsum dolor sit amet consectetur. Metus at aliquet tristique scelerisque feugiat venenatis tempus tellus. Egestas aliquet elit vel cursus neque eros semper. Scelerisque id in nunc gravida nisi. Sed tempus blandit odio arcu mauris. Amet lacus.',
    dailyPrice: '30,00 zł',
    weekendPrice: '60,00 zł',
    transportPrice: '20,00 zł w jedną stronę',
  },
  {
    id: '3',
    image: '/karacher-puzzi.png',
    name: 'Odkurzacz piorący do dywanów i tapicerki Karcher Puzzi 10/2',
    description: 'Wydajna dmuchawa, która przyspiesza suszenie dywanów i tapicerki po praniu. Zapobiega powstawaniu pleśni i nieprzyjemnych zapachów.',
    dailyPrice: '120,00 zł (6 proszki gratis)',
    weekendPrice: '200,00 zł (8 proszków gratis)',
    nextDayPrice: '80,00 zł (2 proszki gratis)',
    transportPrice: '20,00 zł w jedną stronę',
  }
];

// Export both the component and sample data
export { DeviceList, sampleDevices };
export default DeviceList;