import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/money";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassname?: string;
}

export function ProductItem({ product, textContainerClassname }: ProductProps) {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex flex-col gap-4 transition-transform hover:scale-[1.02]"
    >
      <div className="relative min-w-[200px] overflow-hidden rounded-2xl bg-gray-50 lg:rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          width={300}
          height={300}
          className={cn(
            "aspect-square w-full object-cover transition-all duration-300 group-hover:scale-105",
          )}
        />
      </div>

      <div className={cn("flex flex-col gap-2 px-1", textContainerClassname)}>
        <h4 className="line-clamp-2 text-sm leading-tight font-semibold lg:text-base">
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
