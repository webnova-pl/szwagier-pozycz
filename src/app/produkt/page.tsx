import { Suspense } from "react";
import ProductClient from "@/app/produkt/ProductClient";

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-center mt-2">Ładowanie...</p>
        </div>
      }
    >
      <ProductClient />
    </Suspense>
  );
}
