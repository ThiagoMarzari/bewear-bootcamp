"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";
import BuyNowButton from "./buy-now-button";

interface ProductActionsProps {
  productVariantId: string;
}

export default function ProductActions({
  productVariantId,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useQueryState(
    "quantity",
    parseAsInteger.withDefault(1),
  );

  function handleDecrement() {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  }

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <>
      {/* Quantidade */}
      <div className="flex flex-col space-y-4 px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        {/* Adicionar ao carrinho */}

        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <BuyNowButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
      </div>
    </>
  );
}
