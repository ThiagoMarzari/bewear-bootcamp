
import Image from "next/image";

import { CategoriesList } from "@/components/common/categories-list";
import { CategorySelector } from "@/components/common/category-selector";
import { PartnerBrandList } from "@/components/common/partner-brand-list";
import { ProductList } from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get";
import { getNewlyCreateProducts, getProductsWithVariants } from "@/data/products/get";

export default async function Home() {

  const [products, newlyCreateProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreateProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 lg:space-y-12">

      {/* Categorias DESKTOP */}
      <div className="px-5 hidden lg:flex items-center justify-center space-x-6 lg:px-8">
        <CategoriesList categories={categories} />
      </div>

      <div className="px-5 lg:px-8">
        <picture>
          <source media="(min-width: 640px)" srcSet="/banner-01-desktop.png" />
          <Image
            src="/banner-01.png"
            alt="banner"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="mx-auto h-auto w-full rounded-2xl object-cover md:h-[500px] lg:h-[600px] lg:rounded-3xl"
          />
        </picture>
      </div>

      <PartnerBrandList />

      <ProductList title="Mais vendidos" products={products} />

      <div className="px-5 lg:px-8">
        <CategorySelector categories={categories} />
      </div>

      <div className="px-5 lg:px-8">
        <picture>
          <source media="(min-width: 640px)" srcSet="/banner-02.png" />
          <Image
            src="/banner-02.png"
            alt="banner"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="mx-auto h-auto w-full rounded-2xl object-cover md:h-[500px] lg:h-[600px] lg:rounded-3xl"
          />
        </picture>
      </div>

      <ProductList title="Novos lançamentos" products={newlyCreateProducts} />
    </div>
  );
}
