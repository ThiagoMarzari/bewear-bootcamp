import { CategorySelector } from "@/components/common/category-selector";
import { PartnerBrandList } from "@/components/common/partner-brand-list";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreateProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();
  console.log(products);
  return (
    <div className="space-y-6">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          className="mx-auto h-auto w-full max-w-2xl rounded-3xl object-cover md:h-[600px]"
        />
      </div>

      <PartnerBrandList />

      <ProductList title="Mais vendidos" products={products} />

      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>

      <div className="px-5">
        <Image
          src="/banner-02.png"
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList title="Novos lançamentos" products={newlyCreateProducts} />
    </div>
  );
}
