
import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { OrdersList } from "./components/orders-list";

export default async function MyOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const orders = await db.query.orderTable.findMany({
    where: and(
      eq(orderTable.userId, session.user.id),
      eq(orderTable.status, "paid"),
    ),
    orderBy: [desc(orderTable.createdAt)],

    with: {
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

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold lg:text-3xl">Meus pedidos</h1>
      </div>
      <OrdersList orders={orders} />
    </div>
  );
}
