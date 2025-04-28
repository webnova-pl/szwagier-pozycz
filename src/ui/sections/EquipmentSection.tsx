import React from "react";
import CleaningIcon from "../icons/CleaningIcon";
import WrenchIcon from "../icons/WrenchIcon";
import LightningIcon from "../icons/LightningIcon";
import { links } from "@/constants";

const EquipmentSection = () => {
  return (
    <section className="py-20" id="oferta">
      <div className="container max-md:px-6">
        <div className="flex flex-col items-center">
          <span
            className="text-theme-gray-100 font-medium uppercase text-[20px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            nasz sprzęt
          </span>
          <h2
            className="font-bold text-[40px] max-md:text-center leading-[128%] my-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Co znajdziesz u szwagra?
          </h2>
          <p
            className="text-base font-medium max-md:text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Mamy wszystko, co potrzebne do sprzątania i majsterkowania!
          </p>
        </div>
        <div className="my-16 flex flex-col md:flex-row max-md:space-y-8 md:space-x-8 justify-between">
          {/* sprzet czyczczacy */}

          <div
            className="rounded-[20px] overflow-hidden flex-1 flex flex-col max-w-[450px]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
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

          <div
            className="rounded-[20px] overflow-hidden flex-1 flex flex-col max-w-[450px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
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

          <div
            className="rounded-[20px] flex flex-col flex-1 overflow-hidden max-w-[450px]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
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
          <div
            className="flex space-x-2 md:space-x-4 mt-10 justify-center w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href={links.rental}
              className="bg-primary-100 font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-center hover:bg-[#F1B426] transition-all"
              aria-label="Przejdź do strony wynajmu"
            >
              Wynajmij sprzęt
            </a>
            <a
              href={links.contactPage}
              className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-center hover:bg-[#363636] transition-colors"
              aria-label="Przejdź do strony kontaktowej"
            >
              Skontaktuj się
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
