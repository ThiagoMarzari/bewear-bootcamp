import { productTable, productVariantTable } from "@/db/schema";
import { formatCurrency } from "@/utils/money";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

export function ProductItem({ product }: ProductProps) {
  const firstVariant = product.variants[0];
  return (
    <Link 
      href="/" 
      className="group flex w-[200px] flex-shrink-0 flex-col gap-4 transition-transform hover:scale-[1.02] lg:w-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 lg:rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col gap-2 px-1">
        <h4 className="line-clamp-2 text-sm font-semibold leading-tight lg:text-base">
          {product.name}
        </h4>
        <p className="line-clamp-2 text-xs text-gray-600 lg:text-sm">
          {product.description}
        </p>
        <p className="text-sm font-bold text-gray-900 lg:text-lg">
          {formatCurrency(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
