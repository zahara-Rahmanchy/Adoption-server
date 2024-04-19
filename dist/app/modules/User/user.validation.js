"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name field is required",
    }),
    email: zod_1.z
        .string({ required_error: "Email must be a valid email address" })
        .email(),
    password: zod_1.z.string({
        required_error: "Password field is required",
    }),
});
const userUpdateValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
    })
        .strict(),
});
exports.userValidationSchema = {
    userValidation,
    userUpdateValidation,
};
