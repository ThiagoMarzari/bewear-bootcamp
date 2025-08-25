"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getUserOrders() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return orders;
}
