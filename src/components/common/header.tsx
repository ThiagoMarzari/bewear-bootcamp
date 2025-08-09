"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";

import Image from "next/image";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={26.14} />
      </Link>

      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
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
                        <AvatarImage
                          src={session.user.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          Bem-vindo,{" "}
                          <span className="font-bold">{session.user.name}</span>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="cursor-pointer"
                      variant="secondary"
                      onClick={() => authClient.signOut()}
                    >
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
    </header>
  );
}
