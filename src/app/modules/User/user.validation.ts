import {z} from "zod";

const userValidation = z.object({
  name: z.string({
    required_error: "Name field is required",
  }),
  email: z
    .string({required_error: "Email must be a valid email address"})
    .email(),
  password: z.string({
    required_error: "Password field is required",
  }),
});

export const userValidationSchema = {
  userValidation,
};
