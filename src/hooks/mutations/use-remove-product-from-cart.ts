import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/providers/react-query";
import { removeProductFromCart as RemoveProductFromCart } from "@/actions/remove-cart-product";
import { getUserCartQueryKey } from "../queries/use-cart";

export const REMOVE_CART_PRODUCT_MUTATION_KEY = (id: string) =>
  ["remove-cart-product", id] as const;

export const useRemoveProductFromCartMutation = (id: string) => {
  return useMutation({
    mutationKey: REMOVE_CART_PRODUCT_MUTATION_KEY(id),

    mutationFn: () => RemoveProductFromCart({ cartItemId: id }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getUserCartQueryKey(),
      });
    },
  });
};
