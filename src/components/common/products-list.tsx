"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { ProductItem } from "./product-item";

interface ProductProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductList({ title, products }: ProductProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
