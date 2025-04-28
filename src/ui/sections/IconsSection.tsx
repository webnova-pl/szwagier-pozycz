import CarIcon from "../icons/CarIcon";
import FileIcon from "../icons/FileIcon";
import LadderIcon from "../icons/LadderIcon";
import SealCheckIcon from "../icons/SealCheckIcon";

const IconsSection = () => {
  return (
    <section>
      <div className="container max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 my-20 md:mb-28 md:space-x-8 max-md:space-y-10">
          {/* Transport */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div>
              <CarIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Transport sprzętu</h4>
            <p className="text-base text-center font-medium">
              Dowozimy od i do klienta <br /> na terenie Rzeszowa.
            </p>
          </div>

          {/* Instruktaz */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <LadderIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Dokładny instruktaż</h4>
            <p className="text-base text-center font-medium">
              Tłumaczymy i dołączamy <br /> instrukcję obsługi.
            </p>
          </div>

          {/* Sprawdzony sprzęt */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div>
              <SealCheckIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Sprawdzony sprzęt</h4>
            <p className="text-base text-center font-medium">
              Regularnie sprawdzamy <br /> sprawność naszego sprzętu
            </p>
          </div>

          {/* Faktura VAT */}

          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div>
              <FileIcon />
            </div>
            <h4 className="font-bold text-2xl my-4">Faktura VAT</h4>
            <p className="text-base text-center font-medium">
              Na życzenie klienta <br /> wystawiamy fakturę VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconsSection;
