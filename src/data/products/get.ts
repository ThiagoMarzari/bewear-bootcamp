import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

// //DTO (data transfer object)

// interface ProductDto {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   createdAt: Date;
// }

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  return products;
};

export const getNewlyCreateProducts = async () => {
  const products = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  return products;
};

export const getProductById = async (id: string) => {
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.id, id),
    with: {
      variants: true,
    },
  });

  return product;
};
