"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/providers/react-query";
interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export default function AddToCartButton({ productVariantId, quantity }: AddToCartButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-to-cart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
    onError: (error) => {
      toast.error("Erro ao adicionar produto ao carrinho");
    },
  });

  const handleAddToCart = () => {
    if (!session?.user) {
      router.push("/authentication");
      return;
    }

    mutate();
  };

  return (
    <Button className="rounded-full" variant="outline" size="lg" disabled={isPending} onClick={handleAddToCart}>
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
}
