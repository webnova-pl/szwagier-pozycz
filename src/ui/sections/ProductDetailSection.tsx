"use client";
import React, { useEffect, useRef, useState } from "react";
import { Product } from "@/API/models/Product";
import { links } from "@/constants";
import ProductInquiryModal from "@/ui/organisms/ProductInquiryModal";

interface ProductDetailSectionProps {
  product: Product;
}

interface TechnicalSpecRow {
  key: string;
  value: string;
}

const parseInlineTechnicalSpec = (
  technicalSpec: string,
): TechnicalSpecRow[] | null => {
  // Accept inputs like:
  // "- Key | Value, Key 2 | Value 2 -"
  // "Specyfikacja - Key | Value, Key 2 | Value 2 -"
  // and basic HTML wrappers from CMS.
  const plainText = technicalSpec
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText.includes("|")) {
    return null;
  }

  let content = plainText.replace(/^specyfikacja\s*:?\s*/i, "").trim();
  const firstDash = content.indexOf("-");
  const lastDash = content.lastIndexOf("-");
  if (firstDash !== -1 && lastDash > firstDash) {
    content = content.slice(firstDash + 1, lastDash).trim();
  }

  const rows = content
    .split(/\s*,\s*/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const separatorIndex = row.indexOf("|");
      if (separatorIndex === -1) {
        return null;
      }

      const key = row.slice(0, separatorIndex).trim();
      const value = row.slice(separatorIndex + 1).trim();

      if (!key || !value) {
        return null;
      }

      return { key, value };
    })
    .filter((row): row is TechnicalSpecRow => row !== null);

  return rows.length > 0 ? rows : null;
};

const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({
  product,
}) => {
  const {
    title,
    manufacturer,
    catalogNumber,
    powerOutput,
    priceGross,
    priceNet,
    productDescription,
    technicalSpec,
    installationInfo,
    gallery,
  } = product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [hasExpandableDescription, setHasExpandableDescription] =
    useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const galleryTouchStartX = useRef(0);
  const galleryTouchStartY = useRef(0);

  const hasGallery = gallery && gallery.length > 0;
  const hasMultipleImages = hasGallery && gallery.length > 1;

  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImageIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    galleryTouchStartX.current = e.touches[0].clientX;
    galleryTouchStartY.current = e.touches[0].clientY;
  };

  const handleGalleryTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    const dx = e.changedTouches[0].clientX - galleryTouchStartX.current;
    const dy = e.changedTouches[0].clientY - galleryTouchStartY.current;
    const minSwipe = 48;
    if (Math.abs(dx) < minSwipe) return;
    if (Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) nextImage();
    else prevImage();
  };

  const parsedTechnicalSpecRows = parseInlineTechnicalSpec(technicalSpec);

  useEffect(() => {
    const measureDescriptionOverflow = () => {
      if (!descriptionRef.current || descriptionExpanded) return;
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setHasExpandableDescription(scrollHeight > clientHeight + 1);
    };

    measureDescriptionOverflow();
    window.addEventListener("resize", measureDescriptionOverflow);
    return () =>
      window.removeEventListener("resize", measureDescriptionOverflow);
  }, [productDescription, descriptionExpanded]);

  return (
    <div className="bg-[#FAF9F9] max-md:overflow-x-hidden">
      <div className="container max-md:px-4 py-8 md:py-12">
        {/* Back link */}
        <a
          href={links.shop}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3D3D3D] hover:text-black transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Wszystkie produkty
        </a>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* ── Gallery (full-bleed na mobile: do krawędzi ekranu, nie tylko padding kontenera) ── */}
          <div className="max-md:relative max-md:left-1/2 max-md:w-screen max-md:max-w-[100vw] max-md:-translate-x-1/2">
            {/* Main image */}
            <div
              className="relative bg-[#f8f8f8] rounded-2xl max-md:rounded-none overflow-hidden flex items-center justify-center aspect-square touch-pan-y"
              onTouchStart={handleGalleryTouchStart}
              onTouchEnd={handleGalleryTouchEnd}
            >
              {hasGallery ? (
                <img
                  src={gallery[currentImageIndex]}
                  alt={`${title} – zdjęcie ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">Brak zdjęcia</span>
              )}
            </div>

            {hasMultipleImages && (
              <div
                className="mt-3 flex items-center justify-center gap-4 max-md:px-4"
                aria-label="Nawigacja po zdjęciach produktu"
              >
                <button
                  type="button"
                  onClick={prevImage}
                  className="h-10 w-10 shrink-0 cursor-pointer rounded-md bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Poprzednie zdjęcie"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <p
                  className="min-w-[4.5rem] text-center text-sm font-medium text-[#3D3D3D] tabular-nums"
                  aria-live="polite"
                >
                  {currentImageIndex + 1} / {gallery.length}
                </p>
                <button
                  type="button"
                  onClick={nextImage}
                  className="h-10 w-10 shrink-0 cursor-pointer rounded-md bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Następne zdjęcie"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-md:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors bg-[#f8f8f8] cursor-pointer flex items-center justify-center ${
                      i === currentImageIndex
                        ? "border-[#00000069]"
                        : "border-[#EFEFEF] hover:border-gray-200"
                    }`}
                    aria-label={`Zdjęcie ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${title} miniatura ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ─────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            {/* Manufacturer + catalog number */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#3D3D3D]">
              {manufacturer && (
                <span>
                  Producent:{" "}
                  <strong className="text-black font-semibold">
                    {manufacturer}
                  </strong>
                </span>
              )}
              {catalogNumber && (
                <span>
                  Nr katalogowy:{" "}
                  <strong className="text-black font-semibold">
                    {catalogNumber}
                  </strong>
                </span>
              )}
            </div>

            {/* Power + spec link */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#3D3D3D]">
              {powerOutput && (
                <span>
                  Moc urządzenia:{" "}
                  <strong className="text-black font-semibold">
                    {powerOutput}
                  </strong>
                </span>
              )}
              {technicalSpec && technicalSpec.trim() !== "" && (
                <a
                  href="#specyfikacja"
                  className="inline-flex items-center gap-1.5 font-medium text-[#737373] hover:text-black transition-colors border-b border-[#737373] pb-1"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2018_3392)">
                      <path
                        d="M6.5 4.5C8.0913 4.5 9.61742 5.13214 10.7426 6.25736C11.8679 7.38258 12.5 8.9087 12.5 10.5"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 2V12.5H15"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 4.5H4.5"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2018_3392">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Zobacz specyfikację techniczną
                </a>
              )}
            </div>

            {/* Price box */}
            <div className="rounded-xl bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-end gap-5">
                  {priceGross && (
                    <div>
                      <p className="text-xs  mb-0.5">Cena brutto</p>
                      <p className="text-2xl font-bold leading-none text-[#C70C0C]">
                        {priceGross}
                      </p>
                    </div>
                  )}
                  {priceNet && (
                    <div>
                      <p className="text-xs mb-0.5">Bez VAT</p>
                      <p className="text-2xl font-bold leading-none">
                        {priceNet}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="bg-primary-100 max-md:w-full max-md:text-center text-black font-bold rounded-[40px] py-3 px-5 text-sm hover:brightness-95 transition-all whitespace-nowrap cursor-pointer"
                  aria-label="Zapytaj o dostępność produktu"
                >
                  Zapytaj o dostępność
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col md:flex-row gap-2">
              <a
                href="#montaz"
                className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium bg-white transition-colors"
                aria-label="Sprawdź ofertę montażu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2018_3563)">
                    <path
                      d="M5.12569 8.26439C5.08584 8.22459 5.05423 8.17733 5.03267 8.1253C5.0111 8.07327 5 8.01751 5 7.96119C5 7.90487 5.0111 7.8491 5.03267 7.79708C5.05423 7.74505 5.08584 7.69779 5.12569 7.65798L5.55425 7.22943C5.62873 7.17308 5.71959 7.1426 5.81299 7.14264H6.71457C6.82823 7.14264 6.93723 7.09749 7.0176 7.01712C7.09797 6.93675 7.14313 6.82775 7.14313 6.71409V5.82001C7.14318 5.7065 7.18826 5.59765 7.26848 5.51734L10.12 2.66582C10.331 2.45473 10.5816 2.28729 10.8573 2.17304C11.1331 2.0588 11.4286 2 11.7271 2C12.0256 2 12.3211 2.0588 12.5969 2.17304C12.8726 2.28729 13.1232 2.45473 13.3342 2.66582C13.5453 2.87684 13.7127 3.12739 13.827 3.40313C13.9412 3.67888 14 3.97444 14 4.27291C14 4.57139 13.9412 4.86694 13.827 5.14269C13.7127 5.41844 13.5453 5.66898 13.3342 5.88001L10.4827 8.73152C10.4024 8.81174 10.2935 8.85682 10.18 8.85687H9.28592C9.17225 8.85687 9.06325 8.90203 8.98288 8.9824C8.90251 9.06277 8.85736 9.17177 8.85736 9.28543V10.187C8.8574 10.2804 8.82692 10.3713 8.77057 10.4458L8.34202 10.8743C8.30222 10.9142 8.25495 10.9458 8.20292 10.9673C8.1509 10.9889 8.09513 11 8.03881 11C7.98249 11 7.92673 10.9889 7.8747 10.9673C7.82267 10.9458 7.77541 10.9142 7.73561 10.8743L5.12569 8.26439Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10L2 14"
                      stroke="#3D3D3D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2018_3563">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="flex-grow">Sprawdź ofertę montażu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
              <a
                href={links.contactPage}
                className="flex flex-1 items-center gap-3 bg-white rounded-xl px-4 py-3.5 text-sm font-medium"
                aria-label="Zamów telefonicznie"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2018_3546)">
                    <path
                      d="M10.2744 9.08374C10.3436 9.03766 10.4233 9.00959 10.5061 9.00206C10.5889 8.99453 10.6723 9.00778 10.7488 9.04061L13.6963 10.3612C13.7956 10.4037 13.8785 10.4772 13.9326 10.5707C13.9867 10.6642 14.009 10.7727 13.9963 10.88C13.8991 11.6056 13.5418 12.2713 12.9907 12.7533C12.4395 13.2352 11.7321 13.5005 11 13.5C8.74566 13.5 6.58365 12.6045 4.98959 11.0104C3.39553 9.41633 2.5 7.25433 2.5 4.99999C2.49944 4.26786 2.7648 3.56045 3.24673 3.00932C3.72865 2.45818 4.39435 2.10084 5.12 2.00374C5.22727 1.99099 5.33578 2.01333 5.4293 2.06741C5.52281 2.12149 5.5963 2.2044 5.63875 2.30374L6.95938 5.25374C6.99182 5.3295 7.00504 5.41212 6.99784 5.49423C6.99064 5.57634 6.96326 5.65539 6.91813 5.72436L5.5825 7.31249C5.53512 7.38398 5.50711 7.46654 5.50119 7.55209C5.49528 7.63765 5.51166 7.72328 5.54875 7.80061C6.06563 8.85874 7.15938 9.93936 8.22063 10.4512C8.29836 10.4882 8.38439 10.5042 8.47021 10.4977C8.55602 10.4912 8.63867 10.4625 8.71 10.4144L10.2744 9.08374Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2018_3546">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="flex-grow">Zamów telefonicznie</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            </div>

            {/* Product description */}
            {productDescription && productDescription.trim() !== "" && (
              <div className="border-t mt-5 pt-6 border-[#0000001A]">
                <h2 className="text-xl font-bold mb-4">Opis produktu</h2>
                <div
                  ref={descriptionRef}
                  className={`text-sm text-[#3D3D3D] font-medium leading-relaxed overflow-hidden transition-all ${
                    !descriptionExpanded ? "line-clamp-4" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: productDescription }}
                />
                {hasExpandableDescription && (
                  <button
                    onClick={() => setDescriptionExpanded((v) => !v)}
                    className="mt-5 text-sm text-[#737373] font-medium border-b border-[#A8A8A8] pb-1 transition-colors cursor-pointer"
                  >
                    {descriptionExpanded ? "Zwiń opis" : "Rozwiń pełny opis"}
                  </button>
                )}
              </div>
            )}

            {/* ── Technical specification table ───────────────────────── */}
            {technicalSpec && technicalSpec.trim() !== "" && (
              <div
                id="specyfikacja"
                className="scroll-mt-8 mt-5 pt-6 border-[#0000001A] border-t"
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2018_3392)">
                      <path
                        d="M6.5 4.5C8.0913 4.5 9.61742 5.13214 10.7426 6.25736C11.8679 7.38258 12.5 8.9087 12.5 10.5"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 2V12.5H15"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 4.5H4.5"
                        stroke="#737373"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2018_3392">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h2 className="text-xl font-bold">Specyfikacja techniczna</h2>
                </div>

                {parsedTechnicalSpecRows ? (
                  <table className="w-full border-collapse">
                    <tbody>
                      {parsedTechnicalSpecRows.map((row) => (
                        <tr
                          key={row.key}
                          className="border border-[#D9D9D9] hover:bg-[#fafafa]"
                        >
                          <td className="py-3.5 px-4 text-sm text-[#3D3D3D] align-top break-words max-w-[50%]">
                            {row.key}
                          </td>
                          <td className="py-3.5 px-4 border-l border-[#D9D9D9] text-sm font-medium align-top break-words">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div
                    className="[&_table]:w-full [&_table]:border-collapse [&_tr]:border-b [&_tr]:border-[#f0f0f0] [&_td]:py-3.5 [&_td]:px-4 [&_td]:text-sm [&_td]:align-top [&_td]:break-words [&_td]:whitespace-normal [&_td:first-child]:text-[#3D3D3D] [&_td:last-child]:font-medium [&_tr:hover]:bg-[#fafafa] [&_th]:py-3 [&_th]:px-4 [&_th]:text-sm [&_th]:font-bold [&_th]:text-left [&_th]:bg-[#f8f8f8] [&_thead_tr]:border-b [&_thead_tr]:border-[#e0e0e0]"
                    dangerouslySetInnerHTML={{ __html: technicalSpec }}
                  />
                )}
              </div>
            )}

            {installationInfo && installationInfo.trim() !== "" && (
              <div
                className="mt-5 pt-6 border-[#0000001A] border-t"
                id="montaz"
              >
                <h2 className="text-xl font-bold mb-4">Montaż</h2>
                <div
                  className="text-sm text-[#3D3D3D] font-medium leading-relaxed [&_p]:mb-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:text-black [&_h3]:font-bold [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: installationInfo }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Installation info ───────────────────────────────────── */}
      </div>

      <ProductInquiryModal
        product={product}
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
};

export default ProductDetailSection;
