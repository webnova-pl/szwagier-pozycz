import React from "react";

const OfferSection = () => {
  return (
    <section className="bg-theme-gray-400 pt-20 pb-10">
      <div className="container">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <span className="text-theme-gray-100 font-medium uppercase text-[20px]  ">
              O NAS
            </span>
            <h2 className="font-bold text-[40px] leading-[128%] mb-4 mt-6 max-w-[560px]">
              Dlaczego warto pożyczać u szwagra?
            </h2>
          </div>
          <div className="flex space-x-4  justify-center">
            <button className="bg-primary-100 font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Wynajmij sprzęt
            </button>
            <button className="bg-dark-100 text-white font-bold rounded-[40px] py-4 px-6 cursor-pointer">
              Skontaktuj się
            </button>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-8 space-y-20 relative">
          {/* 1 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              Szwagier <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                dba
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                'Sprzęt jest zawsze sprawny i czysty, bo szwagier wie, że "jak dbasz, tak masz".'
              }
            </p>
          </div>

          {/* 2 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              Szwagier <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                zna się
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {"Dlatego kupuje tylko sprawdzony, znany i niezawodny sprzęt."}
            </p>
          </div>

          {/* 3 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              Do szwagra <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                jest blisko
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                "Wygodna lokalizacja, łatwy dojazd i zero problemów z parkowaniem - szwagier zadbał o Twój komfort."
              }
            </p>
          </div>

          {/* 4 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              U szwagra <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                jest taniej
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                "Ceny są tak niskie, że aż wstyd nie pożyczyć. Po co kupować skoro szwagier ma w garażu?"
              }
            </p>
          </div>

          {/* 5 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              Szwagier <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                doradzi
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                "Nie wiesz, jaki odkurzacz będzie najlepszy do twojego dywanu, albo jak zamontować ten obraz który leży pod ścianą już trzeci miesiąc, bo ściana jest z żelbetu i spaliłeś swoją wiertarkę? Szwagier pomoże!"
              }
            </p>
          </div>

          {/* 6 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              U szwagra <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                jest elastycznie
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                "Potrzebujesz sprzęt na dzień, a może na tydzień, lub wypożyczyłeś o 15:00 ale możesz zwrócić dopiero o 17:00, bo szef znowu czegoś chciał? Ze szwagrem dogadasz się bez problemu."
              }
            </p>
          </div>

          {/* 7 */}
          <div>
            <h4 className="font-bold text-base leading-tight">
              U szwagra <br />
              <span className="bg-primary-100 block mt-1 w-fit px-3 rounded-full py-1">
                jest wesoło
              </span>
            </h4>
            <p className="font-medium text-base leading-normal mt-4">
              {
                "Szwagier to dusza człowiek, zawsze znajdzie czas na pogawędkę i dowcip."
              }
            </p>
          </div>

          {/* img */}
          <img
            src="./guy.png"
            alt=""
            className="absolute -bottom-[20%] right-0 w-[340px]"
          />
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
