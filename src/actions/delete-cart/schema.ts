import { z } from "zod";

export const deleteCartSchema = z.object({
  userId: z.string(),
});

export type DeleteCartSchema = z.infer<typeof deleteCartSchema>;
