import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariant: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export function VariantSelector({
  variants,
  selectedVariant,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className="transition-transform hover:scale-105"
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className={`rounded-2xl ${variant.slug === selectedVariant ? "border-primary border-2" : ""}`}
          />
        </Link>
      ))}
    </div>
  );
}
