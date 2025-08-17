import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Addresses from "../components/addresses";
import CartSummary from "../components/cart-summary";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    return notFound();
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
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
    return notFound();
  }

  const shippingAddress = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session?.user.id),
  });

  return (
    <div>
      <div className="space-y-4 px-5">
        <Addresses shippingAddress={shippingAddress} defaultAddressId={cart.shippingAddressId} />
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
