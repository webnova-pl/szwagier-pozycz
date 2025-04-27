import { Metadata } from "next";
import PhoneIcon from "@/ui/icons/PhoneIcon";
import EnvelopeIcon from "@/ui/icons/EnvelopeIcon";
import MapPinIcon from "@/ui/icons/MapPinIcon";
import { address, contactMail, phoneNumber } from "@/constants";

export const metadata: Metadata = {
  title: "Kontakt | Szwagier Pożycz",
  description:
    "Skontaktuj się z nami, aby wypożyczyć sprzęt budowlany lub ogrodowy. Znajdź nas w Rzeszowie.",
  keywords:
    "kontakt wypożyczalnia, adres wypożyczalni sprzętu, telefon wypożyczalnia",
  alternates: {
    canonical: "https://szwagierpozycz.pl/kontakt",
  },
};

export default function Contact() {
  return (
    <main className=" ">
      <section className="bg-theme-gray-400 pt-12 md:pb-20">
        <div className="container">
          <div className="flex flex-col items-center md:flex-row justify-between md:gap-8 lg:gap-[8rem]">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-4xl md:text-[56px] max-md:text-center max-md:mt-6 leading-[128%] mb-4">
                Skontaktuj się <br /> z szwagrem
              </h1>
              <p className="text-[#3D3D3D] font-medium text-[20px] mb-8 max-md:hidden">
                Potrzebujesz wypożyczyć sprzęt? Skontaktuj się z nami
                telefonicznie, mailowo lub odwiedź naszą lokalizację w
                Rzeszowie.
              </p>
              <div className="mb-16 text-[#3D3D3D]">
                <div className="flex gap-6 md:gap-8 max-md:justify-center flex-wrap">
                  <div className="flex gap-4 font-bold text-nowrap">
                    <PhoneIcon />
                    <a href={`tel:${phoneNumber}`} aria-label="Numer telefonu">
                      {phoneNumber}
                    </a>
                  </div>
                  <div className="flex gap-4 font-bold">
                    <EnvelopeIcon />
                    <a
                      href={`mailto:${contactMail}`}
                      aria-label="Email"
                    >
                      {contactMail}
                    </a>
                  </div>
                </div>
                <div className="flex gap-6 mt-6 font-bold text-nowrap justify-center flex-wrap md:justify-start">
                  <MapPinIcon />
                  <p>{address}</p>
                </div>
              </div>
            </div>
            <iframe
              className="w-full rounded-xl -mx-4"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1523.1556291751585!2d22.005827045855433!3d50.05572060058344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfb2321b8aa75%3A0xd56727d71d21b860!2sLubelska%2020%2C%2035-233%20Rzesz%C3%B3w!5e0!3m2!1spl!2spl!4v1745683944842!5m2!1spl!2spl"
              width="550"
              height="500"
              loading="lazy"
              title="Lokalizacja wypożyczalni Szwagier pozycz"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
