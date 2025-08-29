import { MinusIcon, PlusIcon, ShipWheel, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useDecreaseCartProductQuantityMutation } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProductQuantityMutation } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCartMutation } from "@/hooks/mutations/use-remove-product-from-cart";
import { formatCurrency } from "@/utils/money";

import { Button } from "../ui/button";
interface CardItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantName,
  productVariantId,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CardItemProps) {
  const removeProductFromCartMutation = useRemoveProductFromCartMutation(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProductQuantityMutation(id);
  const increaseCartProductQuantityMutation = useIncreaseCartProductQuantityMutation(productVariantId);

  const handleRemoveProductFromCart = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        //toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate();
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={60}
          height={60}
          className="rounded-lg sm:h-[78px] sm:w-[78px]"
        />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium truncate">{productVariantName}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
        <div className="flex items-center gap-2 sm:order-2">
          <div className="flex w-[90px] sm:w-[100px] items-center justify-between rounded-lg border px-2">
            <Button size="icon" className="h-4 w-4" variant="ghost" onClick={handleDecreaseQuantityClick}>
              <MinusIcon />
            </Button>
            {increaseCartProductQuantityMutation.isPending || decreaseCartProductQuantityMutation.isPending ? (
              <ShipWheel className="animate-spin" />
            ) : (
              <p>{quantity}</p>
            )}
            <Button size="icon" className="h-4 w-4" variant="ghost" onClick={handleIncreaseQuantityClick}>
              <PlusIcon />
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={handleRemoveProductFromCart}>
            <TrashIcon size={16} />
          </Button>
        </div>

        <p className="text-sm font-bold sm:order-1">{formatCurrency(productVariantPriceInCents * quantity)}</p>
      </div>
    </div>
  );
}
