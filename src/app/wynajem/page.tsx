import { Metadata } from "next";
import RentalItemsSection from "@/ui/sections/RentalItemsSection";
import IconsSection from "@/ui/sections/IconsSection";
import OfferSection from "@/ui/sections/OfferSection";
import { links } from "@/constants";

export const metadata: Metadata = {
  title: "Wypożycz sprzęt | Szwagier Pożycz",
  description: "Wypożycz profesjonalny sprzęt budowlany i ogrodowy w atrakcyjnych cenach. Szeroki wybór narzędzi i urządzeń dostępnych od zaraz.",
  keywords: "wypożyczenie sprzętu, wynajem narzędzi, wypożyczalnia, sprzęt budowlany, elektronarzędzia",
  alternates: {
    canonical: "https://szwagierpozycz.pl/kontakt",
  },
};

export default function Rent() {
  return (
    <main className=" ">
      <RentalItemsSection />
      <IconsSection />
      <OfferSection withRentButton={false} />
      <div className="flex justify-end p-4 fixed md:hidden bg-white bottom-0 w-full">
        <a 
          href={links.contactPage} 
          className="bg-dark-100 text-center w-full text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-nowrap"
          aria-label="Przejdź do strony kontaktowej"
        >
          Skontaktuj się
        </a>
      </div>
    </main>
  );
}