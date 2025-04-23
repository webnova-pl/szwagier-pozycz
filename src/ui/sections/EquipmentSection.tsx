import React from "react";
import CleaningIcon from "../icons/CleaningIcon";
import WrenchIcon from "../icons/WrenchIcon";
import LightningIcon from "../icons/LightningIcon";
import HandCoinsIcon from "../icons/HandCoinsIcon";
import CarIcon from "../icons/CarIcon";
import LadderIcon from "../icons/LadderIcon";
import FileIcon from "../icons/FileIcon";

const EquipmentSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col items-center">
          <span className="text-theme-gray-100 font-medium uppercase text-[20px]  ">
            nasz sprzęt
          </span>
          <h2 className="font-bold text-[40px] leading-[128%] my-4">
            Co znajdziesz u szwagra?
          </h2>
          <p className="text-base font-medium">
            Mamy wszystko, co potrzebne do sprzątania i majsterkowania!
          </p>
        </div>
        <div className="my-16 flex flex-col md:flex-row space-x-8 justify-between">
          {/* sprzet czyczczacy */}

          <div className="rounded-[20px] overflow-hidden flex-1 flex flex-col max-w-[450px]">
            <div className="">
              <img src="./sprzet-czyszczacy.png" alt="" className="w-full" />
            </div>
            <div className="bg-theme-gray-400 flex-1 text-dark-100 px-8 pb-10 pt-14 relative">
              <div className="bg-primary-100 aspect-square w-[74px] flex justify-center items-center rounded-lg absolute top-0 -translate-y-1/2">
                <CleaningIcon />
              </div>
              <h3 className="font-bold text-2xl mb-4">Sprzęt czyszczący</h3>
              <p className="text-base leading-normal">
                Odkurzacze piorące, szorowarki, parownice, myjki do okien, myjki
                ciśnieniowe i inny sprzęt czyszczący - wszystko, żeby twój dom
                lśnił czystością.
              </p>
            </div>
          </div>

          {/* elektronarzedzia */}

          <div className="rounded-[20px] overflow-hidden flex-1 flex flex-col max-w-[450px]">
            <div className="">
              <img src="./elektronarzedzia-img.png" alt="" className="w-full" />
            </div>
            <div className="bg-theme-gray-400 flex-1 text-dark-100 px-8 pb-10 pt-14 relative">
              <div className="bg-primary-100 aspect-square w-[74px] flex justify-center items-center rounded-lg absolute top-0 -translate-y-1/2">
                <WrenchIcon />
              </div>
              <h3 className="font-bold text-2xl mb-4">Elektronarzędzia</h3>
              <p className="text-base leading-normal">
                Wkrętarki, wiertarki, szlifierki, piły i wiele innych- wszystko,
                żebyś mógł zrealizować swoje majsterkowe projekty.
              </p>
            </div>
          </div>

          {/* agregaty */}

          <div className="rounded-[20px] flex flex-col flex-1 overflow-hidden max-w-[450px]">
            <div className="">
              <img src="./agregaty-img.png" alt="" className="w-full" />
            </div>
            <div className="bg-theme-gray-400 flex-1 text-dark-100 px-8 pb-10 pt-14 relative">
              <div className="bg-primary-100 aspect-square w-[74px] flex justify-center items-center rounded-lg absolute top-0 -translate-y-1/2">
                <LightningIcon />
              </div>
              <h3 className="font-bold text-2xl mb-4">Agregaty Prądotwórcze</h3>
              <p className="text-base leading-normal">
                Bo umówmy się prądu zawsze brakuje w najmniej oczekiwanych
                momentach. 
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex space-x-4 mt-10 justify-center">
            <button className="bg-primary-100 font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Wynajmij sprzęt
            </button>
            <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Skontaktuj się
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 mt-40 mb-20 space-x-8">
          {/* Bez kaucji */}

          <div className="flex flex-col items-center">
            <div>
              <HandCoinsIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Bez kaucji</h4>
            <p className="text-base text-center font-medium">
              Przy umowie wynajmu nie pobieramy kaucji.
            </p>
          </div>

          {/* Transport */}

          <div className="flex flex-col items-center">
            <div>
              <CarIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Transport sprzętu</h4>
            <p className="text-base text-center font-medium">
              Dowozimy od i do klienta na terenie Rzeszowa.
            </p>
          </div>

          {/* Instruktaz */}

          <div className="flex flex-col items-center">
            <div>
              <LadderIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Dokładny instruktaż</h4>
            <p className="text-base text-center font-medium">
              Tłumaczymy i dołączamy instrukcję obsługi.
            </p>
          </div>

          {/* Faktura VAT */}

          <div className="flex flex-col items-center">
            <div>
              <FileIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Faktura VAT</h4>
            <p className="text-base text-center font-medium">
              Na życzenie klienta wystawiamy fakturę VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
