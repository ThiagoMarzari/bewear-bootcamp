import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "@/actions/update-cart-shipping-address/schema";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

export const getUpdateCartShippingAddressMutationKey = () => ["update-cart-shipping-address"] as const;

export function useUpdateCartShippingAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: async (data: UpdateCartShippingAddressSchema) => {
      const validatedData = updateCartShippingAddressSchema.parse(data);
      return updateCartShippingAddress(validatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}
