"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getCart() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
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

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
    };
  }

  // Retorno explicito
  // return {
  //   ...cart,
  //   totalPriceInCents: cart.items.reduce((total, item) => {
  //     return total + item.productVariant.priceInCents * item.quantity;
  //   }, 0),
  // };

  //Mas temos o implicito
  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (total, item) => total + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  };
}
