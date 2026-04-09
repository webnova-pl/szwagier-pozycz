import React from "react";
import ProductCard from "../atoms/ProductCard";
import { Product } from "@/API/models/Product";

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div
      className="container mx-auto px-4"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
