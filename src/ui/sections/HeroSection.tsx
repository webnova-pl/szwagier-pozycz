import React from "react";
import ArrowIcon from "../icons/ArrowIcon";

const HeroSection = () => {
  return (
    <section className="container flex flex-col-reverse md:flex-row pb-20">
      <div className="flex-1 flex justify-end max-md:-mt-32 flex-col z-20 max-md:px-6">
        <p
          className="text-theme-gray-100 font-medium uppercase text-base md:text-[20px] mb-8"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          Sprzęt czyszczący, elektronarzędzia, agregaty
        </p>
        <h1
          className="font-bold md:text-[56px] max-sm:text-3xl text-4xl leading-snug"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <span className="bg-primary-100 rounded-full px-4 py-2">
            Wypożyczalnia
          </span>
          <br /> sprzętu i narzędzi <br /> w Rzeszowie
        </h1>
        <h2
          className="mt-6 text-base md:text-[20px] text-theme-gray-200"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          U Szwagra masz wszystko{" "}
          <span className="font-bold">do domu i ogrodu</span>.{" "}
          <br className="md:block hidden" /> Nie każdy ma szwagra, więc my nim
          jesteśmy!
        </h2>
        <div
          className="mt-6 max-md:hidden py-4 px-6 rounded-full border border-[#E2E2E2] inline-block w-fit"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <a
            href="#oferta"
            className=" text-theme-gray-300 font-bold text-base flex space-x-3 items-center"
            aria-label="Zapoznaj się z ofertą"
          >
            <span>Zapoznaj się z naszą ofertą</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div
        className="flex justify-end relative max-md:mt-10"
        data-aos="fade-up"
      >
        <img src="./hero-img.png" alt="Hero img" className="hidden md:block" />
        <img
          src="./hero-mobile.png"
          alt="Hero img"
          className="block md:hidden"
        />
        <div className="absolute -left-32 -bottom-10 hidden md:block">
          <img src="./guy.png" alt="" className="w-[362px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
