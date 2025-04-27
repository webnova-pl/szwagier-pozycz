import React, { JSX } from "react";
import guyImage from "@public/guy.png";
import { links } from "@/constants";

interface Benefit {
  title: string;
  highlight: string;
  description: string;
}

interface OfferSectionProps {
  withRentButton?: boolean;
}

const OfferSection: React.FC<OfferSectionProps> = ({
  withRentButton = true,
}) => {
  const benefits: Benefit[] = [
    {
      title: "Szwagier",
      highlight: "dba",
      description:
        'Sprzęt jest zawsze sprawny i czysty, bo szwagier wie, że "jak dbasz, tak masz".',
    },
    {
      title: "Szwagier",
      highlight: "zna się",
      description:
        "Dlatego kupuje tylko sprawdzony, znany i niezawodny sprzęt.",
    },
    {
      title: "Do szwagra",
      highlight: "jest blisko",
      description:
        "Wygodna lokalizacja, łatwy dojazd i zero problemów z parkowaniem - szwagier zadbał o Twój komfort.",
    },
    {
      title: "U szwagra",
      highlight: "jest taniej",
      description:
        "Ceny są tak niskie, że aż wstyd nie pożyczyć. Po co kupować skoro szwagier ma w garażu?",
    },
    {
      title: "Szwagier",
      highlight: "doradzi",
      description:
        "Nie wiesz, jaki odkurzacz będzie najlepszy do twojego dywanu, albo jak zamontować ten obraz który leży pod ścianą już trzeci miesiąc, bo ściana jest z żelbetu i spaliłeś swoją wiertarkę? Szwagier pomoże!",
    },
    {
      title: "U szwagra",
      highlight: "jest elastycznie",
      description:
        "Potrzebujesz sprzęt na dzień, a może na tydzień, lub wypożyczyłeś o 15:00 ale możesz zwrócić dopiero o 17:00, bo szef znowu czegoś chciał? Ze szwagrem dogadasz się bez problemu.",
    },
    {
      title: "U szwagra",
      highlight: "jest wesoło",
      description:
        "Szwagier to dusza człowiek, zawsze znajdzie czas na pogawędkę i dowcip.",
    },
  ];

  const renderButtons = (): JSX.Element => (
    <div className="flex space-x-4 max-md:hidden justify-center max-md:w-full">
      {withRentButton && (
        <a
          href={links.rental}
          className="bg-primary-100 font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full"
          aria-label="Przejdź do strony wynajmu"
        >
          Wynajmij sprzęt
        </a>
      )}
      <a
        href={links.contactPage}
        className="bg-dark-100 text-white font-bold rounded-[40px] py-4 md:px-6 cursor-pointer max-md:w-full"
        aria-label="Przejdź do strony kontaktowej"
      >
        Skontaktuj się
      </a>
    </div>
  );

  const BenefitCard = ({ benefit }: { benefit: Benefit }): JSX.Element => (
    <div>
      <h4 className="font-bold text-xl max-md:text-2xl leading-tight">
        {benefit.title} <br />
        <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
          {benefit.highlight}
        </span>
      </h4>
      <p className="font-medium text-base leading-normal mt-4">
        {benefit.description}
      </p>
    </div>
  );

  return (
    <section className="bg-theme-gray-400 pt-20 md:pb-10 pb-40">
      <div className="container max-md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <span className="text-theme-gray-100 font-medium uppercase text-[20px]">
              O NAS
            </span>
            <h2 className="font-bold text-[40px] leading-[128%] mb-4 mt-6 max-w-[560px]">
              Dlaczego warto pożyczać u szwagra?
            </h2>
          </div>
          {renderButtons()}
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-8 space-y-20 relative">
          {benefits.map((benefit, index) => (
            <BenefitCard key={`benefit-${index}`} benefit={benefit} />
          ))}

          {/* Image */}
          <img
            width={340}
            height={340}
            src={guyImage.src}
            alt="Szwagier"
            className="absolute -bottom-[22%] md:-bottom-[25%] right-0 w-[340px]"
          />
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
