"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export async function addProductToCart(data: AddProductToCartSchema) {
  //validar dados
  addProductToCartSchema.parse(data);

  //verificar se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  //verificar se a variante existe
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.id, data.productVariantId),
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  //pegar carrinho
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
  });
  let cartId = cart?.id;

  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();

    cartId = newCart.id;
  }

  //verificar se a variante já está no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.cartId, cartId) && eq(cartItem.productVariantId, data.productVariantId),
  });

  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));

    return;
  }

  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
}
