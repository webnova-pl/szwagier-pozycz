import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary-100 relative z-20">
      <div className="relative ">
        <div className="flex flex-col md:flex-row container">
          <div className="flex-1 flex flex-col justify-center py-20 relative z-10 max-md:px-6">
            <span className="bg-dark-100 text-white rounded-full px-4 py-2 font-bold text-4xl md:text-[40px] w-fit">
              Szwagier Pożycz
            </span>
            <p className="text-dark-100 font-bold text-[40px]">
              - bo pożyczanie od rodziny <br /> to najlepszy interes!
            </p>
            <p
              className="mt-4 mb-8 font-medium"
              dangerouslySetInnerHTML={{
                __html:
                  'Zadzwoń do nas i przekonaj się sam, że "Szwagier Pożycz" <br /> to najlepszy wybór dla Ciebie i Twojego domu!',
              }}
            />

            <div className="flex space-x-4 w-full">
              <button className="bg-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer text-dark-100 max-md:w-full">
                Wynajmij sprzęt
              </button>
              <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full">
                Skontaktuj się
              </button>
            </div>
          </div>
          {/* <div className="flex-1 flex justify-end"> */}
          <div className="flex md:hidden">
            <img src="./footer-img-mobile.png" alt="" className="w-full" />
          </div>

          <div className="absolute hidden md:block right-0 top-0 bottom-0">
            <img src="./footer-img.png" alt="" className="h-full" />
          </div>
        </div>
      </div>
      <div className="bg-dark-100 text-[#919191] md:py-4 py-8 font-medium text-xs relative z-10">
        <div className="container flex flex-col max-md:items-center md:flex-row justify-between">
          <div className="flex flex-col md:flex-row md:space-x-8 max-md:space-y-4">
            <span>Szwagier Pożycz 2025</span>
            <Link href="/polityka-prywatnosci">Polityka Prywatności</Link>
          </div>
          <div className="max-md:mt-4">Design by Daria Pyziak</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
