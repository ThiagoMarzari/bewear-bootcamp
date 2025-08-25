import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { deleteCart } from "@/actions/delete-cart";
import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET);
  console.log("Evento recebido", event.type);
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    
    if (!orderId) {
      return NextResponse.error();
    }
    
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
      columns: {
        userId: true,
      },
    });
    
    if (!order) {
      console.error("Order not found:", orderId);
      return NextResponse.error();
    }
    
    await db
      .update(orderTable)
      .set({
        status: "paid",
      })
      .where(eq(orderTable.id, orderId));
    
    await deleteCart({ userId: order.userId });
  } 
  //else if (event.type === 'checkout.session.canceled')
  return NextResponse.json({ received: true });
};
