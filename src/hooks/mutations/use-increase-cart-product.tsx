import { addProductToCart } from "@/actions/add-cart-product";
import { queryClient } from "@/providers/react-query";
import { useMutation } from "@tanstack/react-query";

export const useIncreaseCartProductQuantityMutation = (productVariantId: string) =>
  useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ productVariantId: productVariantId, quantity: 1 }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });