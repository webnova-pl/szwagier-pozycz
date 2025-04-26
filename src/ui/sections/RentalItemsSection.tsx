"use client";
import React, { useState, useEffect } from "react";
import RentalItemsList from "../organisms/RentalItemsList";
import SearchInput from "../atoms/SearchField";
import { RentalItem } from "@/API/models/RentalItem";
import { RentalItemsService } from "@/API/services/rentalItemsService";
import Spinner from "../atoms/Spinner";

const RentalItemsSection: React.FC = () => {
  // State for all devices and filtered devices
  const [allDevices, setAllDevices] = useState<RentalItem[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch devices on component mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const devices = await RentalItemsService.getAllItems();
        setAllDevices(devices);
        setFilteredDevices(devices);
        setError(null);
      } catch (err) {
        console.error("Error fetching rental items:", err);
        setError("Nie udało się załadować sprzętu. Spróbuj ponownie później.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // Handle search event from SearchInput component
  const handleSearch = (searchQuery: string) => {
    // If search query is empty, show all devices
    if (!searchQuery || !searchQuery.trim()) {
      setFilteredDevices(allDevices);
      return;
    }

    // Filter devices by name or description
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allDevices.filter(
      (device) =>
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
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Show loading spinner instead of text */}
      {isLoading && <div><Spinner /> <p className="text-center">Ładowanie...</p></div> }

      {/* Show error message if there's an error */}
      {error && (
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      )}

      {/* Display filtered devices when not loading and no error */}
      {!isLoading && !error && <RentalItemsList rentalItems={filteredDevices} />}

      {/* Show message when no devices match search */}
      {!isLoading && !error && filteredDevices.length === 0 && (
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-gray-600">
            Nie znaleziono sprzętu pasującego do wyszukiwania
          </p>
        </div>
      )}
    </section>
  );
};

export default RentalItemsSection;