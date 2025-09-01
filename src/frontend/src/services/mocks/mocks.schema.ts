import { z } from "zod";

export const MockSchema = z.object({
  id: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  url: z.string().transform(val => val ?? ''),
  delay: z.number().transform(val => val ?? 0),
}).strict()

export type Mock = z.infer<typeof MockSchema>;
