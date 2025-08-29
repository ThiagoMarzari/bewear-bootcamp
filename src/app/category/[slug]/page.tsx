
import { notFound } from "next/navigation";

import { ProductItem } from "@/components/common/product-item";
import { getCategoryBySlug } from "@/data/categories/get";
import { getProductsWithVariants } from "@/data/products/get";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsWithVariants();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-5 lg:px-8">
      <h2 className="text-2xl font-semibold">{category.name}</h2>
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
