"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../atoms/ProductCard";
import { Product } from "@/API/models/Product";
import { ProductsService } from "@/API/services/productsService";
import Spinner from "../atoms/Spinner";

interface OtherProductsSectionProps {
  /** Pomija bieżący produkt na stronie szczegółów */
  excludeSlug?: string;
}

const OtherProductsSection: React.FC<OtherProductsSectionProps> = ({
  excludeSlug,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ProductsService.getAllProducts(1, 48)
      .then((items) => {
        const sorted = [...items].sort((a, b) => b.id - a.id);
        const others = sorted.filter((p) => p.slug !== excludeSlug);
        setProducts(others.slice(0, 4));
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [excludeSlug]);

  if (isLoading) {
    return (
      <section className="bg-[#FAF9F9]">
        <div className="container max-md:px-4 py-8 md:py-12 border-t border-[#0000001A]">
          <h2 className="uppercase font-bold text-xl text-center">
            Zobacz INNE PRODUKTY
          </h2>
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FAF9F9]">
      <div className="container max-md:px-4 py-8 md:py-12 border-t border-[#0000001A]">
        <h2 className="uppercase font-bold text-xl text-center">
          Zobacz INNE PRODUKTY
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProductsSection;
