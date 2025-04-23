import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-theme-gray-400">
      <div className="container flex py-28">
        <div className="flex-1">
          <img src="./about-us-img.png" alt="" className="rounded-[10px]" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-theme-gray-100 font-medium uppercase text-[20px]  ">
            O NAS
          </span>
          <h2 className="font-bold text-[40px] leading-[128%] mb-4 mt-6">
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
          <div className="flex space-x-4 mt-10">
            <button className="bg-primary-100 font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Wynajmij sprzęt
            </button>
            <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Skontaktuj się
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
