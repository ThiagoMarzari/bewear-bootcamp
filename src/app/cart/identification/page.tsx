import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    return notFound();
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session?.user.id),
  });

  if (!cart) {
    return notFound();
  }

  return (
    <div>
      <h1>Identification</h1>
    </div>
  );
}
