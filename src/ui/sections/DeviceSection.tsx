"use client"
import React, { useState } from "react";
import DeviceList, { sampleDevices } from "../organisms/DeviceList";
import SearchInput from "../atoms/SearchField";
import { DeviceItemProps } from "../atoms/DeviceItem";



const DeviceSection: React.FC = () => {
  // State for the filtered devices
  const [filteredDevices, setFilteredDevices] = useState<DeviceItemProps[]>(sampleDevices);
  
  // Handle search event from SearchInput component
  const handleSearch = (searchQuery: string) => {
    // If search query is empty, show all devices
    if (!searchQuery || !searchQuery.trim()) {
      setFilteredDevices(sampleDevices);
      return;
    }

    // Filter devices by name or description
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = sampleDevices.filter(
      device => 
        device.name.toLowerCase().includes(lowerCaseQuery) || 
        device.description.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredDevices(filtered);
  };

  return (
    <section className="bg-theme-gray-400 py-12 pb-20">
      <div className="container max-md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col">
            <h2 className="font-bold text-[56px] leading-[128%] mb-4">
              Wynajmij nasz sprzęt
            </h2>
            <p className="text-[#3D3D3D] font-medium text-[20px] mb-8">
              Lorem ipsum dolor sit amet consectetur. Ultrices a in non ut
              ultrices aliquet sagittis pretium. Lectus laoreet consectetur.
            </p>
          </div>
          <div className="mb-4 w-full md:flex md:justify-end">
            <SearchInput 
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      
      {/* Display filtered devices */}
      <DeviceList devices={filteredDevices}/>
      
      {/* Show message when no devices match search */}
      {filteredDevices.length === 0 && (
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-gray-600">
            Nie znaleziono sprzętu pasującego do wyszukiwania
          </p>
        </div>
      )}
    </section>
  );
};

export default DeviceSection;