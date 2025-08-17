import { useMutation } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { CreateShippingAddressSchema } from "@/actions/create-shipping-address/schema";

export const useCreateShippingAddressMutation = () =>
  useMutation({
    mutationKey: ["create-shipping-address"],
    mutationFn: (data: CreateShippingAddressSchema) => createShippingAddress(data),
  });
