
import RentalItemsSection from "@/ui/sections/RentalItemsSection";
import IconsSection from "@/ui/sections/IconsSection";
import OfferSection from "@/ui/sections/OfferSection";

export default function Rent() {
  return (
    <main className=" ">
      <RentalItemsSection></RentalItemsSection>
      <IconsSection />
      <OfferSection withRentButton={false} />
        <div className="flex justify-end p-4 fixed md:hidden bg-white bottom-0 w-full">
          <button className="bg-dark-100 text-center w-full text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full text-nowrap">
            Skontaktuj się
          </button>
        </div>
    </main>
  );
}
