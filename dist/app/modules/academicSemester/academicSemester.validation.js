"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterZod = void 0;
const zod_1 = require("zod");
const academicSemester_const_1 = require("./academicSemester.const");
//validator for Academic Semester
const academicSemesterSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_const_1.AcademicSemesterName]),
        year: zod_1.z.string(),
        code: zod_1.z.enum([...academicSemester_const_1.AcademicSemesterCode]),
        startMonth: zod_1.z.enum([...academicSemester_const_1.months]),
        endMonth: zod_1.z.enum([...academicSemester_const_1.months]),
    }),
});
exports.academicSemesterZod = {
    academicSemesterSchemaValidation,
};
