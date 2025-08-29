"use client";

import { ShoppingBasketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { formatCurrency } from "@/utils/money";

import { Button } from "../ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import AuthModal from "./auth-modal";
import { CartItem } from "./cart-item";

export default function Cart() {
  const { data: session } = authClient.useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // Só busca o carrinho se o usuário estiver logado
  const { data: cart, isPending: cartIsLoading } = useCart({
    enabled: !!session?.user,
  });

  // Desabilita a query se não houver sessão
  const shouldShowCart = session?.user && cart;

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCartClick = () => {
    if (!session?.user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsSheetOpen(true);
  };

  const handleFinishOrderClick = async () => {
    setIsNavigating(true);
    setIsSheetOpen(false);

    // Pequeno delay para permitir que o sheet feche suavemente
    setTimeout(() => {
      router.push("/cart/identification");
    }, 100);
  };

  // Prefetch da página de identificação quando o carrinho tiver itens
  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      router.prefetch("/cart/identification");
    }
  }, [cart?.items, router]);

  // Reseta o estado de navegação quando o sheet for fechado
  useEffect(() => {
    if (!isSheetOpen) {
      setIsNavigating(false);
    }
  }, [isSheetOpen]);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Button variant="ghost" size="icon" className="relative h-10 w-10" onClick={handleCartClick}>
          <ShoppingBasketIcon className="h-5 w-5" />
          {/* Exibir a quantidade de itens no carrinho apenas se logado */}
          {shouldShowCart && cart.items.length > 0 && (
            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
              <p>{cart.items.reduce((total, item) => total + item.quantity, 0)}</p>
            </div>
          )}
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col px-5 pb-6">
            <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-8">
                  {cart?.items && cart.items.length > 0 ? (
                    cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={item.productVariant.priceInCents}
                        quantity={item.quantity}
                        productVariantId={item.productVariant.id}
                      />
                    ))
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                      <ShoppingBasketIcon className="text-muted-foreground mb-4 h-16 w-16" />
                      <h3 className="mb-2 text-lg font-semibold">Seu carrinho está vazio</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        Adicione alguns produtos ao seu carrinho para continuar
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {cart?.items && cart.items.length > 0 && (
              <div className="flex flex-col gap-4">
                <Separator />
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal: </p>
                  <p>{formatCurrency(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Entrega: </p>
                  <p>Grátis</p>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Total: </p>
                  <p>{formatCurrency(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Button
                  className="mt-5 rounded-full"
                  onClick={handleFinishOrderClick}
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <>
                      <LoadingSpinner className="mr-2 h-4 w-4" />
                      Carregando...
                    </>
                  ) : (
                    "Finalizar compra"
                  )}
                </Button>
              </div>
            )}
          </div>
          {cartIsLoading && <div>...loading</div>}
        </SheetContent>
      </Sheet>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
