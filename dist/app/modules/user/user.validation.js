"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z
        .string()
        .max(20, { message: "password can not be larger than 20 char" }),
});
exports.userZodValidation = {
    userZodSchema,
};
