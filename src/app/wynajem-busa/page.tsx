import { Metadata } from "next";
import PhoneIcon from "@/ui/icons/PhoneIcon";
import EnvelopeIcon from "@/ui/icons/EnvelopeIcon";
import MapPinIcon from "@/ui/icons/MapPinIcon";
import { address, contactMail, phoneNumber } from "@/constants";

export const metadata: Metadata = {
  title: "Wynajem busa | Szwagier Pożycz",
  description:
    "Wynajmij busa na wydarzenia, imprezy lub wyprawy. Znajdź nas w Rzeszowie.",
  keywords: "wynajem busa, adres wypożyczalni busa, telefon wypożyczalni busa",
  alternates: {
    canonical: "https://szwagierpozycz.pl/wynajem-busa",
  },
};

export default function RentalBus() {
  return (
    <main className="max-md:mt-4">
      <section className="bg-white md:pt-12 md:pb-20 pt-4">
        <div className="container max-md:px-4">
          <div className="flex flex-col items-start md:flex-row justify-between md:gap-8 lg:gap-[8rem]">
            <div className="flex flex-col gap-4">
              <h1
                className="font-bold text-4xl md:text-[56px] max-md:text-center max-md:mt-6 leading-[128%] mb-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Szwagier, <br />
                Pożycz busa!
              </h1>
              <div
                className="text-[#3D3D3D] font-medium text-[16px] mb-8"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <b> Potrzebujesz transportu większych rzeczy? </b>{" "}
                Przeprowadzka, zakupy, przewóz mebli, AGD, materiałów
                budowlanych czy innych gabarytów - jedziemy i pomagamy! Wynajmij
                busa wraz z kierowcą! <br />
                <br />
                <b> Chcesz wywieść zalegające rzeczy? </b> Pozbędziemy się tego,
                co tylko zajmuje miejsce! W tym np.:
                <ul className="list-inside">
                  <li>- stare meble (kanapy, szafy, łóżka)</li>
                  <li>- zużyty sprzęt AGD i RTV</li>
                  <li>- kartony, worki i niepotrzebne rzeczy po porządkach</li>
                  <li>- odpady po remoncie (bez odpadów niebezpiecznych)</li>
                  <li>- stare rowery, opony, wyposażenie garażu</li>
                  <li>- gałęzie, odpady z działki i ogrodu</li>
                </ul>
                <br />
                <b>
                  Szwagier pomoże – szybko, sprawnie i bez zbędnego gadania!
                </b>
              </div>
              <div
                className="mb-16 text-[#3D3D3D]"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex gap-6 md:gap-8 max-md:justify-center flex-wrap">
                  <div className="flex gap-4 font-bold text-nowrap">
                    <PhoneIcon />
                    <a href={`tel:${phoneNumber}`} aria-label="Numer telefonu">
                      {phoneNumber}
                    </a>
                  </div>
                  <div className="flex gap-4 font-bold">
                    <EnvelopeIcon />
                    <a href={`mailto:${contactMail}`} aria-label="Email">
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
            <div>
              <img
                src="/wypozycz-bus.png"
                alt="Wynajem busa"
                className="w-full md:rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
