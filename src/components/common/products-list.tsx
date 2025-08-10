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
      <h3 className="px-5 text-2xl font-semibold md:text-3xl lg:px-8 lg:text-4xl">
        {title}
      </h3>

      {/* MOBILE */}
      <div className="flex w-full gap-4 overflow-x-auto px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden px-8 lg:block">
        <div className="grid grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
