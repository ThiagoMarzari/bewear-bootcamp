"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateCheckoutSessionSchema, createCheckoutSessionSchema } from "./schema";

export default async function createCheckoutSession(formData: CreateCheckoutSessionSchema) {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_SECRET_KEY is not set");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const { orderId } = createCheckoutSessionSchema.parse(formData);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  if (order?.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((item) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${item.productVariant.product.name} - ${item.productVariant.name}`,
            description: item.productVariant.product.description,
            images: [item.productVariant.imageUrl],
          },
          unit_amount: item.productVariant.priceInCents,
        },
        quantity: item.quantity,
      };
    }),
  });
  return checkoutSession;
}
