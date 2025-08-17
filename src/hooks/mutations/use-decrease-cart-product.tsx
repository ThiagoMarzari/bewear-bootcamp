import { useMutation } from "@tanstack/react-query";

import { DecreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { queryClient } from "@/providers/react-query";

import { getUseCartQueryKey } from "../queries/use-cart";

export const useDecreaseCartProductQuantityMutation = (cartItemId: string) =>
  useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => DecreaseCartProductQuantity({ cartItemId: cartItemId }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
