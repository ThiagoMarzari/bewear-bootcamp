"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

import { userTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Cart from "./cart";

interface HeaderClientProps {
  user: (typeof userTable.$inferSelect) | null;
}

export function HeaderClient({ user }: HeaderClientProps) {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex items-center gap-2">
      <Cart />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="px-5">
            {session?.user ? (
              // Logged in
              <>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session.user.image as string | undefined} />
                      <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        Bem-vindo, <span className="font-bold">{session.user.name}</span>
                      </p>
                      <p className="text-muted-foreground text-sm">{session.user.email}</p>
                    </div>
                  </div>
                  <Button className="cursor-pointer" variant="secondary" onClick={() => authClient.signOut()}>
                    <LogOutIcon />
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/my-orders">Meus pedidos</Link>
                  </Button>
                </div>
              </>
            ) : (
              // Not logged in
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button asChild variant="secondary">
                  <Link href="/authentication">
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
            {user?.role === "admin" && (
              <div className="mt-4 space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            )}
          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}