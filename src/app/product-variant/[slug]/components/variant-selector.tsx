"use client";

import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export function VariantSelector({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) {
  const router = useRouter();

  function handleSelect(slug: string) {
    router.push(`/product-variant/${slug}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => handleSelect(variant.slug)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            loading="lazy"
            className={`rounded-2xl ${variant.slug === selectedVariantSlug ? "border-primary border-2" : ""}`}
          />
        </button>
      ))}
    </div>
  );
}
