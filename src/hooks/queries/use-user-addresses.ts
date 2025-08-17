import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getUserAddressesQueryKey = () => ["user-addresses"] as const;

export const useUserAddresses = ({
  initialData,
}: { initialData?: (typeof shippingAddressTable.$inferSelect)[] } = {}) =>
  useQuery({
    queryKey: getUserAddressesQueryKey(),
    queryFn: () => getUserAddresses(),
    initialData,
  });
