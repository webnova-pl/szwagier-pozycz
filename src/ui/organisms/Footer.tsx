import { links } from "@/constants";
import Link from "next/link";
import React from "react";

interface FooterProps {
  withoutRentButton?: boolean;
}

const Footer: React.FC<FooterProps> = ({ withoutRentButton = false }) => {
  return (
    <footer className="bg-primary-100 relative z-20">
      <div className="relative ">
        <div className="flex flex-col md:flex-row container">
          <div className="flex-1 flex flex-col justify-center py-20 relative z-10 max-md:px-6">
            <span className="bg-dark-100 whitespace-nowrap text-white rounded-full px-4 py-2 font-bold text-[34px] md:text-[40px] w-fit">
              Szwagier Pożycz
            </span>
            <p className="text-dark-100 font-bold text-[36px] leading-tight">
              - bo pożyczanie od rodziny <br className="md:block hidden" /> to
              najlepszy interes!
            </p>
            <p
              className="mt-4 mb-8 font-medium"
              dangerouslySetInnerHTML={{
                __html:
                  'Zadzwoń do nas i przekonaj się sam, że "Szwagier Pożycz" <br /> to najlepszy wybór dla Ciebie i Twojego domu!',
              }}
            />

            <div className="flex space-x-2 md:space-x-4 max-md:w-full">
              {!withoutRentButton && (
                <a
                  href={links.rental}
                  className="bg-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer text-dark-100 max-md:w-full text-center hover:bg-gray-100 transition-colors"
                  aria-label="Przejdź do strony wynajmu"
                >
                  Wynajmij sprzęt
                </a>
              )}
              <a
                href={links.contactPage}
                className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-center hover:bg-[#363636] transition-colors"
                aria-label="Przejdź do strony kontaktowej"
              >
                Skontaktuj się
              </a>
            </div>
          </div>
          {/* <div className="flex-1 flex justify-end"> */}
          <div className="flex md:hidden">
            <img src="/images/footer-img-mobile.webp" alt="" className="w-full" />
          </div>

          <div className="absolute hidden md:block right-0 top-0 bottom-0">
            <img src="/images/footer-img.webp" alt="" className="h-full" />
          </div>
        </div>
      </div>
      <div className="bg-dark-100 text-[#919191] md:py-4 py-8 font-medium text-xs relative z-10">
        <div className="container flex flex-col max-md:items-center md:flex-row justify-between">
          <div className="flex flex-col md:flex-row md:space-x-8 max-md:space-y-4">
            <span>Szwagier Pożycz 2025</span>
            <Link href={links.privacyPolicy}>Polityka Prywatności</Link>
          </div>
          <div className="max-md:mt-4">
            Designed by{" "}
            <a href="https://www.dariapyziakdesign.pl/pl" target="_blank">
              Daria Pyziak Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
