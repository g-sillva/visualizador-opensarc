import { z } from "zod";

export const filterFormSchema = z.object({
  responsible: z.string().max(200).optional(),
  day: z.array(z.string()).optional(),
  subject: z.string().max(200).optional(),
  time: z.string().max(200).optional(),
});
