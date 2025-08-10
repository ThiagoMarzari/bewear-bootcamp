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
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={200}
        height={200}
        className="rounded-3xl"
      />
      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCurrency(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
