"use client";
import React, { useState, useEffect, useCallback } from "react";
import RentalItemsList from "../organisms/RentalItemsList";
import SearchInput from "../atoms/SearchField";
import { RentalItem } from "@/API/models/RentalItem";
import { RentalItemsService } from "@/API/services/rentalItemsService";
import Spinner from "../atoms/Spinner";
// import InfoIcon from "../icons/InfoIcon";

const RentalItemsSection: React.FC = () => {
  // State for all devices and filtered devices
  const [allDevices, setAllDevices] = useState<RentalItem[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the fetch function to prevent recreating it on each render
  const fetchDevices = useCallback(async () => {
    try {
      // Prevent setting state if component is unmounted
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
  }, []);

  // Separate useEffect for data fetching
  useEffect(() => {
    fetchDevices();

    // Cleanup function to handle component unmounting
    return () => {
      // Any cleanup if needed
    };
  }, [fetchDevices]);

  // Memoize the search function
  const handleSearch = useCallback(
    (query: string) => {
      // If search query is empty, show all devices
      if (!query || !query.trim()) {
        setFilteredDevices(allDevices);
        return;
      }

      // Filter devices by name or description
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(lowerCaseQuery) ||
          device.description.toLowerCase().includes(lowerCaseQuery)
      );

      setFilteredDevices(filtered);
    },
    [allDevices]
  );

  // Debug logging - remove in production
  // console.log("Render state:", {
  //   isLoading,
  //   devicesCount: allDevices.length,
  //   filteredCount: filteredDevices.length,
  // });

  return (
    <section className="bg-theme-gray-400 py-12 pb-20">
      <div className="container max-md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col">
            <h2
              className="font-bold text-[36px] md:text-[56px] leading-[128%] mb-4 lg:text-nowrap"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Wynajmij nasz sprzęt
            </h2>
            <p
              className="text-[#3D3D3D] font-medium text-base md:text-[20px] mb-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Tu znajdziesz wszystko, co potrzebne do działania!
            </p>
          </div>
          <div
            className="mb-8 w-full md:flex md:justify-end"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Loading spinner */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner />
          <p className="text-center mt-2">Ładowanie...</p>
        </div>
      ) : error ? (
        // Error message
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : filteredDevices.length > 0 ? (
        // Display filtered devices
        <RentalItemsList rentalItems={filteredDevices} />
      ) : (
        // No devices match search
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-gray-600">
            Nie znaleziono sprzętu pasującego do wyszukiwania
          </p>
        </div>
      )}
      {/* <div className="container flex justify-center mt-10 md:mt-20 font-medium text-xl items-center space-x-4 max-md:px-4 max-md:text-sm ">
        <span>
          <InfoIcon />
        </span>
        <p className="">
          Przy umowie wynajmu pobieramy kaucję w&nbsp;wysokości 100 zł pobierane
          na kartę.
        </p>
      </div> */}
    </section>
  );
};

export default RentalItemsSection;
