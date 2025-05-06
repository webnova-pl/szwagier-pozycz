import { links } from "@/constants";
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-theme-gray-400">
      <div className="container flex flex-col md:flex-row max-md:px-6 py-28">
        <div className="flex-1" data-aos="fade-right" data-aos-delay="200">
          <img
            src="/images/about-us-img.webp"
            alt=""
            className="rounded-[10px] hidden md:block"
          />
          <img src="/images/about-us-mobile.webp" alt="" className="block md:hidden" />
        </div>
        <div
          className="flex-1 flex flex-col max-md:mt-12 justify-center"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <span className="text-theme-gray-100 font-medium uppercase text-[20px]  ">
            O NAS
          </span>
          <h2 className="font-bold text-[32px] md:text-[40px] leading-[128%] mb-4 mt-6">
            Poznaj swojego <br /> niezawodnego Szwagra!
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html:
                'Wszystko zaczęło się od tego, że szwagier miał za dużo sprzętu. Serio, garaż pękał w szwach od odkurzaczy, wiertarek i innych "przydasiów". Żona szwagra zaczęła więc podejrzliwie kręcić nosem, a szwagier, jak to szwagier, postanowił zrobić z tego biznes. I tak oto powstał "Szwagier Pożycz" - wypożyczalnia, w której znajdziesz wszystko, czego potrzebujesz, żeby ogarnąć dom i podwórko. <br /> <br /> Wiemy, że nie każdy ma swojego szwagra dlatego my chcemy być Twoim!',
            }}
            // className="max-w-[600px]"
            className="text-base"
          />
          <div className="flex space-x-2 md:space-x-4 mt-10 max-md:w-full">
            <a
              href={links.rental}
              aria-label="Przejdź do strony wynajmu"
              className="bg-primary-100 font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full hover:bg-[#F1B426] transition-all text-center"
            >
              Wynajmij sprzęt
            </a>
            <a
              href={links.contactPage}
              aria-label="Przejdź do strony kontaktowej"
              className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full hover:bg-[#363636] transition-colors text-center"
            >
              Skontaktuj się
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
