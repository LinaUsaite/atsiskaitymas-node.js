const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .email({ error: "Invalid email format" }),

  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" }),
}).strict();

module.exports = loginSchema;