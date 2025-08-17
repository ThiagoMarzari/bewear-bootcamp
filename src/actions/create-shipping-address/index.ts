"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateShippingAddressSchema, createShippingAddressSchema } from "./schema";

export async function createShippingAddress(data: CreateShippingAddressSchema) {
  // Validar dados
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Criar o endereço de entrega
  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      cpfOrCnpj: data.cpf,
      phone: data.phone,
      zipCode: data.cep,
      street: data.address,
      number: data.number,
      complement: data.complement || null,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      country: "Brasil", // Assumindo que é sempre Brasil por enquanto
    })
    .returning();

  // Invalida o cache do carrinho
  revalidatePath("/cart/identification");

  return shippingAddress;
}
