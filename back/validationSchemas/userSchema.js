const { z } = require("zod");

const UserSchema = z
  .object({
    username: z
      .string({ error: "Name is required" })
      .trim()
      .min(1, { error: "Name cannot be empty" }),

    email: z
      .string({ error: "Email is required" })
      .email({ error: "Invalid email format" }),

    password: z
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { error: "Password must contain an uppercase letter" })
      .regex(/[0-9]/, { error: "Password must contain a number" }),

    passwordConfirm: z.string({
      error: "Please confirm your password",
    }),
  })
  // data is the entire parsed object being validated at that point.
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords do not match",
  });

module.exports = UserSchema;
