import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Provide a valid email address."),
  password: z.string().min(10, "Password should be atleast 10 characters"),
});

export type LoginForm = z.infer<typeof loginSchema>;
