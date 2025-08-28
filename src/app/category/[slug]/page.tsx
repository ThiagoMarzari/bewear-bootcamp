import { ProductItem } from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-5">
      <h2 className="text-2xl font-semibold">{category.name}</h2>
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
