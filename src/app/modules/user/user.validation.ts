import { z } from "zod";

const userZodSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "password can not be larger than 20 char" }),
});

export const userZodValidation = {
  userZodSchema,
};
