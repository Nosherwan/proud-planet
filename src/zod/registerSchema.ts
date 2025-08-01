import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Provide a valid email address."),
  firstName: z
    .string()
    .min(3, "First name should be atleast 3 characters")
    .max(32, "First name can only be 32 characters max"),
  lastName: z
    .string()
    .min(3, "First name should be atleast 3 characters")
    .max(32, "First name can only be 32 characters max"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
