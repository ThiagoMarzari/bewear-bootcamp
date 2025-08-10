import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCurrency } from "@/utils/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductVariantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: true,
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-6">
      {/* Imagem */}
      <div className="relative mx-auto aspect-square max-h-[550px] w-full max-w-xl overflow-hidden rounded-3xl md:max-w-2xl lg:max-w-3xl">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          fill
          quality={100}
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      {/* VARIANTS */}
      <div className="px-5"></div>

      {/* Detalhes */}
      <div className="space-y-4 px-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
        </div>
        <p className="text-lg font-bold">
          {formatCurrency(productVariant.priceInCents)}
        </p>
      </div>

      {/* Quantidade */}
      <div className="px-5"></div>

      {/* Adicionar ao carrinho */}
      <div className="flex flex-col space-y-4 px-5">
        <Button className="rounded-full" variant="outline" size="lg">
          Adicionar ao carrinho
        </Button>
        <Button className="rounded-full">Comprar agora</Button>
      </div>

      <div className="px-5">
        <p className="text-sm">{productVariant.product.description}</p>
      </div>
    </div>
  );
}
