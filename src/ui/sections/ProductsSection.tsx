"use client";
import React, { useState, useEffect, useCallback } from "react";
import ProductsList from "../organisms/ProductsList";
import SearchInput from "../atoms/SearchField";
import { Product } from "@/API/models/Product";
import { ProductsService } from "@/API/services/productsService";
import Spinner from "../atoms/Spinner";

const ProductsSection: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const products = await ProductsService.getAllProducts();
      setAllProducts(products);
      setFilteredProducts(products);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Nie udało się załadować produktów. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query || !query.trim()) {
        setFilteredProducts(allProducts);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.manufacturer.toLowerCase().includes(lowerCaseQuery) ||
          product.catalogNumber.toLowerCase().includes(lowerCaseQuery),
      );

      setFilteredProducts(filtered);
    },
    [allProducts],
  );

  return (
    <section className="bg-theme-gray-400 py-12 pb-20">
      <div className="container max-md:px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div
            className="flex flex-col"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="font-bold text-[36px] md:text-[56px] leading-[128%]">
              Agregaty prądotwórze
            </h2>
            <p className="text-[#3D3D3D] font-medium text-base md:text-[20px] mt-2 max-w-2xl">
              Brak dostępu do sieci elektrycznej nie musi być przeszkodą. Dzięki
              kupnie agregatu zasilisz swoje urządzenia w każdych warunkach.
            </p>
          </div>
          <div className="md:pt-3" data-aos="fade-left" data-aos-delay="200">
            <SearchInput onSearch={handleSearch} placeholder="Wyszukaj..." />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner />
          <p className="text-center mt-2">Ładowanie...</p>
        </div>
      ) : error ? (
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <div className="container max-md:px-6 text-center py-8">
          <p className="text-lg text-gray-600">
            Nie znaleziono produktów pasujących do wyszukiwania
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
