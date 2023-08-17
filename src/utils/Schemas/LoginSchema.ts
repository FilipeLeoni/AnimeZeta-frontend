import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must have at least 6 characters"),
  rememberMe: z.boolean(),
});
