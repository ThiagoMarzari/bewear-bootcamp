import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";

import { DeleteCartSchema } from "./schema";

export const deleteCart = async ({userId}: DeleteCartSchema) => {
  // Se não receber userId, buscar da sessão atual (para uso em componentes)
  if (!userId) {
    const { headers } = await import("next/headers");
    const { auth } = await import("@/lib/auth");
    
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      throw new Error("Unauthorized");
    }
    
    userId = session.user.id;
  }
  
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
  });
  
  if (!cart) {
    throw new Error("Cart not found");
  }

  await db.transaction(async (tx) => {
    await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });
};
