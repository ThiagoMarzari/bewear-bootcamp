import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#f4efff] p-4">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="cursor-pointer hover:bg-[#f4efff]"
          >
            {category.name}
            {/* Comentário de teste */}
          </Button>
        ))}
      </div>
    </div>
  );
}
