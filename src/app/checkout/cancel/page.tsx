"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CheckoutCancelPage() {
  return (
    <>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Cancelamento"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido cancelado</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi cancelado. Você pode continuar comprando
            em nossa loja ou tentar novamente mais tarde.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Continuar comprando
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
