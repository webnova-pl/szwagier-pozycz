"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/API/models/Product";
import { ProductsService } from "@/API/services/productsService";
import ProductDetailSection from "@/ui/sections/ProductDetailSection";
import Spinner from "@/ui/atoms/Spinner";
import { links } from "@/constants";
import OtherProductsSection from "@/ui/sections/OtherProductsSection";

export default function ProductClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    ProductsService.getProductBySlug(slug)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (!slug) {
    return (
      <div className="container max-md:px-4 py-24 text-center">
        <p className="text-lg text-[#3D3D3D] mb-6">Nie znaleziono produktu.</p>
        <a href={links.shop} className="text-sm font-medium underline">
          Wróć do sklepu
        </a>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Spinner />
        <p className="text-center mt-2">Ładowanie...</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container max-md:px-4 py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-[#3D3D3D] mb-8">
          Produkt nie został znaleziony.
        </p>
        <a
          href={links.shop}
          className="bg-dark-100 text-white font-bold rounded-[40px] py-4 px-8 hover:bg-[#363636] transition-colors"
        >
          Wróć do sklepu
        </a>
      </div>
    );
  }

  return (
    <main className="max-md:mt-4">
      <ProductDetailSection product={product} />
      <OtherProductsSection excludeSlug={product.slug} />
    </main>
  );
}
