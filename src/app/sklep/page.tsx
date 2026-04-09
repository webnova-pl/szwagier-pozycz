import { Metadata } from "next";
import ProductsSection from "@/ui/sections/ProductsSection";

export const metadata: Metadata = {
  title: "Sklep | Szwagier Pożycz",
  description:
    "Kup profesjonalny sprzęt budowlany i ogrodowy w atrakcyjnych cenach. Szeroki wybór narzędzi i urządzeń dostępnych od ręki.",
  keywords:
    "sprzedaż sprzętu, sklep narzędzia, sprzęt budowlany, elektronarzędzia, kup narzędzia",
  alternates: {
    canonical: "https://szwagierpozycz.pl/sklep",
  },
};

export default function Shop() {
  return (
    <main className="max-md:mt-4">
      <ProductsSection />
    </main>
  );
}
