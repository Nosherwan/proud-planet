import { z } from "zod";

const passwordSchema = z
  .string()
  .min(10, "Password must be atleast 10 characters.")
  .max(50, "Password cannot exceed 50 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const createPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password & confirm password fields do not match",
    path: ["confirm"],
  });

export type CreatePasswordForm = z.infer<typeof createPasswordSchema>;
