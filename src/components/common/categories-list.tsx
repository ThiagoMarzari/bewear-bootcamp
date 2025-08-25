import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategoriesListProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            asChild
            className="h-12 cursor-pointer rounded-xl bg-white/60 font-medium shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md  lg:text-base"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
        </>
  );
}
