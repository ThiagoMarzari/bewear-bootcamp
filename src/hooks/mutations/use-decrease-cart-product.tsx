import { DecreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { queryClient } from "@/providers/react-query";
import { useMutation } from "@tanstack/react-query";

export const useDecreaseCartProductQuantityMutation = (cartItemId: string) =>
  useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => DecreaseCartProductQuantity({ cartItemId: cartItemId }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
