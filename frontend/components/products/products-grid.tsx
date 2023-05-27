import React from "react";
import { ProductCard } from "./product-card";
import { Product } from "@types";

export const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};
