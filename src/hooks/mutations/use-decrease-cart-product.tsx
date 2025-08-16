import { DecreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { queryClient } from "@/providers/react-query";
import { useMutation } from "@tanstack/react-query";
import { getUserCartQueryKey } from "../queries/use-cart";

export const useDecreaseCartProductQuantityMutation = (cartItemId: string) =>
  useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => DecreaseCartProductQuantity({ cartItemId: cartItemId }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getUserCartQueryKey(),
      });
    },
  });
