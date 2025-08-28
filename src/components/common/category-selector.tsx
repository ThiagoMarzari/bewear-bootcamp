import { categoryTable } from "@/db/schema";

import { CategoriesList } from "./categories-list";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 lg:rounded-3xl lg:p-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}
