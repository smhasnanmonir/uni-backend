"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
// Define Zod schema for UserName
const UserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().min(1),
});
// Define Zod schema for Guardian
const GuardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.number().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.number().min(1),
});
// Define Zod schema for LocalGuardian
const LocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.number().min(1),
    address: zod_1.z.string().min(1),
});
// Define Zod schema for Student
const StudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: UserNameSchema,
            gender: zod_1.z.enum(["male", "female", "others"]),
            age: zod_1.z.number(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.number().min(1),
            emergencyContactNo: zod_1.z.number().min(1),
            bloodType: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            guardian: GuardianSchema,
            localGuardian: LocalGuardianSchema,
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.studentValidations = {
    StudentZodSchema,
};
