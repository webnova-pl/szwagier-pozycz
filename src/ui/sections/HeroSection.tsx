import React from "react";
import ArrowIcon from "../icons/ArrowIcon";

const HeroSection = () => {
  return (
    <section className="container flex flex-col-reverse md:flex-row pb-20">
      <div className="flex-1 flex justify-end flex-col">
        <p className="text-theme-gray-100 font-medium uppercase text-[20px] mb-8">
          Sprzęt czyszczący, elektronarzędzia, agregaty
        </p>
        <h1 className="font-bold text-[56px] leading-normal">
          <span className="bg-primary-100 rounded-full px-4 py-2">
            Wypożyczalnia
          </span>
          <br /> sprzętu i narzędzi <br /> w Rzeszowie
        </h1>
        <h2 className="mt-6 text-[20px] text-theme-gray-200">
          U Szwagra masz wszystko{" "}
          <span className="font-bold">do domu i ogrodu</span>. <br /> Nie każdy
          ma szwagra, więc my nim jesteśmy!
        </h2>
        <div className="mt-6 py-4 px-6 rounded-full border border-[#E2E2E2] inline-block w-fit">
          <a
            href=""
            className=" text-theme-gray-300 font-bold text-base flex space-x-3 items-center"
          >
            <span>Zapoznaj się z naszą ofertą</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className=" flex justify-end relative ">
        <img src="./hero-img.png" alt="Hero img" />
        <div className="absolute -left-32 -bottom-10 ">
          <img src="./guy.png" alt="" className="w-[362px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
