
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";

export default async function ConfirmationPage() {
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

  return (
    <div className="space-y-4 px-5 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Identificação
          </CardTitle>

        </CardHeader>
        <CardContent className="space-y-4">
          <Card>
            <CardContent >
              <div className="flex flex-col gap-2">
                <p className="text-sm ">
                  {formatAddress(cart.shippingAddress!)}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full" size="lg">Finalizar compra</Button>
        </CardContent>

      </Card>
      <CartSummary cart={cart} />
    </div>
  )
}