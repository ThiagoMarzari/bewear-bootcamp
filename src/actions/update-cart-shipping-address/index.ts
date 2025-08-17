"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { type UpdateCartShippingAddressSchema, updateCartShippingAddressSchema } from "./schema";

export async function updateCartShippingAddress(data: UpdateCartShippingAddressSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const validatedData = updateCartShippingAddressSchema.parse(data);

  try {
    await db
      .update(cartTable)
      .set({
        shippingAddressId: validatedData.shippingAddressId,
      })
      .where(eq(cartTable.userId, session.user.id));

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar endereço de envio do carrinho:", error);
    throw new Error("Erro ao atualizar endereço de envio do carrinho");
  }
}
