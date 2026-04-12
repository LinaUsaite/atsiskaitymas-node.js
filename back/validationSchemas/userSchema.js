const { z } = require("zod");

const userSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(3, "Username must be at least 3 characters long"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
}).strict();

module.exports = userSchema;