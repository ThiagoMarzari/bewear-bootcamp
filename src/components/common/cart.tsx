"use client";

import { ShoppingBasketIcon } from "lucide-react";

import { formatCurrency } from "@/utils/money";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { CartItem } from "./cart-item";
import { useCart } from "@/hooks/queries/use-cart";
import Link from "next/link";

export default function Cart() {
  //Renomeando o data para cart
  const { data: cart, isPending: cartIsLoading } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <ShoppingBasketIcon className="h-5 w-5" />
          {/* Exibir a quantidade de itens no carrinho */}
          {cart && cart.items.length > 0 && (
            <div className="border-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border">
              <p>{cart.items.reduce((total, item) => total + item.quantity, 0)}</p>
            </div>
          )}
        </Button>
      </SheetTrigger>
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

              <Button className="mt-5 rounded-full" asChild>
                <Link href="/cart/identification">Finalizar compra</Link>
              </Button>
            </div>
          )}
        </div>
        {cartIsLoading && <div>...loading</div>}
      </SheetContent>
    </Sheet>
  );
}
