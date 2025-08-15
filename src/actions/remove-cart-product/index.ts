"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { RemoveCartProductSchema, removeCartProductSchema } from "./schema";

export async function removeProductFromCart(data: RemoveCartProductSchema) {
  //validar dados
  removeCartProductSchema.parse(data);

  //verificar se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  const cartDoesNotBelongToUser = cartItem?.cart.userId !== session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }
  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  //Remover item do carrinho
  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
}
