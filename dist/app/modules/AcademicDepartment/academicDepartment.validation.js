"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentZod = void 0;
const zod_1 = require("zod");
const academicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "faculty name must be string",
            required_error: "Name is required",
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "faculty name must be string",
            required_error: "Name is required",
        }),
    }),
});
exports.academicDepartmentZod = {
    academicDepartmentValidation,
};
