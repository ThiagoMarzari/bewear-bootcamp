import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/utils/money";

import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { toast } from "sonner";

interface CardItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CardItemProps) {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border px-2">
            <Button
              size="icon"
              className="h-4 w-4"
              variant="ghost"
              onClick={() => {}}
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              size="icon"
              className="h-4 w-4"
              variant="ghost"
              onClick={() => {}}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRemoveProductFromCart}
        >
          <TrashIcon size="icon" />
        </Button>

        <p className="text-sm font-bold">
          {formatCurrency(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
}
