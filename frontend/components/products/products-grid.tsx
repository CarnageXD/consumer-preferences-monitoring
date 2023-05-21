import React from "react";
import { ProductCard } from "./product-card";

export const ProductsGrid = () => {
  const fakeData = Array.from({ length: 12 });

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fakeData.map((_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
};
