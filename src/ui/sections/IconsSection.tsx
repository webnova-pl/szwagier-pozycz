import React from "react";
import HandCoinsIcon from "../icons/HandCoinsIcon";
import CarIcon from "../icons/CarIcon";
import LadderIcon from "../icons/LadderIcon";
import FileIcon from "../icons/FileIcon";

const IconsSection = () => {
  return (
    <section>
      <div className="container max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 my-20 md:space-x-8 max-md:space-y-10">
          {/* Bez kaucji */}

          <div className="flex flex-col items-center">
            <div>
              <HandCoinsIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Bez kaucji</h4>
            <p className="text-base text-center font-medium">
              Przy umowie wynajmu <br /> nie pobieramy kaucji.
            </p>
          </div>

          {/* Transport */}

          <div className="flex flex-col items-center">
            <div>
              <CarIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Transport sprzętu</h4>
            <p className="text-base text-center font-medium">
              Dowozimy od i do klienta <br /> na terenie Rzeszowa.
            </p>
          </div>

          {/* Instruktaz */}

          <div className="flex flex-col items-center">
            <div>
              <LadderIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Dokładny instruktaż</h4>
            <p className="text-base text-center font-medium">
              Tłumaczymy i dołączamy <br /> instrukcję obsługi.
            </p>
          </div>

          {/* Faktura VAT */}

          <div className="flex flex-col items-center">
            <div>
              <FileIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Faktura VAT</h4>
            <p className="text-base text-center font-medium">
              Na życzenie klienta <br /> wystawiamy fakturę VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconsSection;
