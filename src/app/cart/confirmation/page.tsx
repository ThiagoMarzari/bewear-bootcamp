import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import FinishOrderButton from "../components/finish-order-button";
import { formatAddress } from "../helpers/address";

export default async function ConfirmationPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    redirect("/");
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
    redirect("/identification");
  }

  return (
    <div className="mt-4 space-y-4 px-5">
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm">{formatAddress(cart.shippingAddress!)}</p>
              </div>
            </CardContent>
          </Card>
          <FinishOrderButton />
        </CardContent>
      </Card>
      <CartSummary cart={cart} />
    </div>
  );
}
