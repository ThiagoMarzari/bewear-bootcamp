import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";

export const useUserAddresses = () =>
  useQuery({
    queryKey: ["user-addresses"],
    queryFn: () => getUserAddresses(),
  });
