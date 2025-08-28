import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { HeaderClient } from "./header-client";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, session?.user?.id as string)
  })



  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt="Logo" width={120} height={31} className="h-auto w-24 md:w-28 lg:w-32" />
        </Link>

        <HeaderClient user={user ?? null} />
      </div>
    </header>
  );
}
