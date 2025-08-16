import { MinusIcon, PlusIcon, ShipWheel, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/utils/money";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRemoveProductFromCartMutation } from "@/hooks/mutations/use-remove-product-from-cart";
import { useDecreaseCartProductQuantityMutation } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProductQuantityMutation } from "@/hooks/mutations/use-increase-cart-product";
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
        toast.success("Produto removido do carrinho.");
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={productVariantImageUrl} alt={productVariantName} width={78} height={78} className="rounded-lg" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">{productVariantName}</p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border px-2">
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
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant="outline" size="icon" onClick={handleRemoveProductFromCart}>
          <TrashIcon size="icon" />
        </Button>

        <p className="text-sm font-bold">{formatCurrency(productVariantPriceInCents * quantity)}</p>
      </div>
    </div>
  );
}
