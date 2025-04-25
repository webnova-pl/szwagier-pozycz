import React from "react";
import CircleIcon from "../icons/CircleIcon";
import TriangleIcon from "../icons/TraiangleIcon";
import TransportIcon from "../icons/TransportIcon";

// Simplified type definitions for device item props
export interface DeviceItemProps {
  id: string;
  image: string;
  name: string;
  description: string;
  dailyPrice: string;
  weekendPrice?: string;
  transportPrice: string;
  nextDayPrice?: string;
}

const DeviceItem: React.FC<DeviceItemProps> = ({
  image,
  name,
  description,
  dailyPrice,
  weekendPrice,
  transportPrice,
  nextDayPrice,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-8 md:px-8 px-4 bg-white rounded-lg border-2 border-[#f2f2f2]">
      {/* Device image */}
      <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0 ">
        <img src={image} alt={name} className="max-w-full h-auto" />
      </div>

      {/* Device details */}
      <div className="flex-grow md:ml-6">
        {/* Device title */}
        <h2 className="text-xl font-bold mb-2">{name}</h2>

        {/* Device description */}
        <p className="mb-4 text-sm font-medium">{description}</p>

        <div className="flex justify-between">
          {/* Rental information */}
          <div className="mb-4">
            <p className="text-xs mb-2 font-medium">Cennik wypożyczenia:</p>

            <div className="flex flex-wrap justify-start gap-y-8 md:gap-x-16 gap-x-8">
              <div className="flex items-start gap-2">
                <CircleIcon></CircleIcon>
                <div className="text-sm">
                  Doba: <p className="font-bold">{dailyPrice}</p>
                </div>
              </div>
              {nextDayPrice && (
                <div className="flex items-start gap-2">
                  <CircleIcon></CircleIcon>
                  <div className="text-sm">
                    Kolejna doba: <p className="font-bold">{nextDayPrice}</p>
                  </div>
                </div>
              )}

              {/* Weekend price (if available) */}
              {weekendPrice && (
                <div className="flex items-start gap-2">
                  <TriangleIcon></TriangleIcon>
                  <div className="text-sm">
                    Weekend (pt-pon):{" "}
                    <p className="font-bold">{weekendPrice}</p>
                  </div>
                </div>
              )}

              {/* Transport price */}
              <div className="flex items-start gap-2">
                <TransportIcon></TransportIcon>
                <div className="text-sm">
                  Transport (Rzeszów): <p className="font-bold">{transportPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact button */}
          <div className="md:flex hidden items-end ">
            <div className="flex justify-end">
              <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-nowrap">
                Skontaktuj się
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
