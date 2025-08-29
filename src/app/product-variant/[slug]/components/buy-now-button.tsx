"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/common/auth-modal";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/providers/react-query";

interface BuyNowButtonProps {
  productVariantId: string;
  quantity: number;
}

export default function BuyNowButton({ productVariantId, quantity }: BuyNowButtonProps) {
  const { data: session } = authClient.useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["buy-now", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      router.push("/cart/identification");
    },
    onError: () => {
      toast.error("Erro ao processar compra");
    },
  });

  const handleBuyNow = () => {
    if (!session?.user) {
      setIsAuthModalOpen(true);
      return;
    }

    mutate();
  };

  return (
    <>
      <Button className="rounded-full" size="lg" disabled={isPending} onClick={handleBuyNow}>
        {isPending && <Loader2 className="animate-spin" />}
        Comprar agora
      </Button>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
