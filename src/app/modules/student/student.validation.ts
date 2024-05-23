import { z } from "zod";

// Define Zod schema for UserName
const UserNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

// Define Zod schema for Guardian
const GuardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.number().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.number().min(1),
});

// Define Zod schema for LocalGuardian
const LocalGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.number().min(1),
  address: z.string().min(1),
});

// Define Zod schema for Student
const StudentZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: UserNameSchema,
      gender: z.enum(["male", "female", "others"]),
      age: z.number(),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.number().min(1),
      emergencyContactNo: z.number().min(1),
      bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: GuardianSchema,
      localGuardian: LocalGuardianSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  StudentZodSchema,
};
