import { email, z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character");


export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(5, {
    message: "Password must be at least 5 characters",
  }),
});