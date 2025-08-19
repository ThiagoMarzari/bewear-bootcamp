"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

export default function FinishOrderButton() {
  const [sucessDialogOpen, setSucessDialogOpen] = useState(false);
  const router = useRouter();

  const handleFinishOrder = () => {
    finishOrderMutation.mutate();
    setSucessDialogOpen(true);
  }

  const finishOrderMutation = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalizar compra"}
      </Button>
      <Dialog open={sucessDialogOpen} onOpenChange={setSucessDialogOpen}>
        <DialogContent className="text-center">

          <Image src="/illustration.svg" alt="Sucess" width={200} height={200} className="mx-auto" />

          <DialogTitle className="text-2xl font-bold">
            Pedido efetuado com sucesso
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <div className="flex flex-col gap-4 w-full">
              <Button
                className="w-full cursor-pointer"
                variant="outline"
                onClick={() => {
                  setSucessDialogOpen(false);
                  router.push("/");
                }}
              >
                Voltar para a loja
              </Button>
              <Button
                className="w-full cursor-pointer"
                onClick={() => {
                  setSucessDialogOpen(false);
                  // TODO: Implementar página de pedidos do usuário
                  router.push("/");
                }}
              >
                Ver meus pedidos
              </Button>
            </div>

          </DialogFooter>

        </DialogContent>
      </Dialog>
    </>
  );
}
