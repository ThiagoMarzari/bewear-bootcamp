"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import createCheckoutSession from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

export default function FinishOrderButton() {
  const [sucessDialogOpen, setSucessDialogOpen] = useState(false);
  const router = useRouter();

  const handleFinishOrder = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
    }

    const { orderId } = await finishOrderMutation.mutateAsync();
    const checkoutSession = await createCheckoutSession({
      orderId,
    });

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    setSucessDialogOpen(true);
  };

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

          <DialogTitle className="text-2xl font-bold">Pedido efetuado com sucesso</DialogTitle>

          <DialogDescription className="text-muted-foreground">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <div className="flex w-full flex-col gap-4">
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
