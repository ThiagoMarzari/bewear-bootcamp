"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Cart from "./cart";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 lg:mb-9">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt="Logo" width={120} height={31} className="h-auto w-24 md:w-28 lg:w-32" />
        </Link>

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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
