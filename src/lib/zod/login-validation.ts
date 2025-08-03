import z from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export type loginFormType = z.infer<typeof loginSchema>;
