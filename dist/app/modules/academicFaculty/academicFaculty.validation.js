"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyZod = void 0;
const zod_1 = require("zod");
const academicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "faculty name must be string",
        }),
    }),
});
exports.academicFacultyZod = {
    academicFacultyValidation,
};
