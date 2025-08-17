import { shippingAddressTable } from "@/db/schema";

export const formatAddress = (address: typeof shippingAddressTable.$inferSelect) => {
  return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipCode}`;
};
