import { z } from "zod";
const academicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "faculty name must be string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "faculty name must be string",
      required_error: "Name is required",
    }),
  }),
});

export const academicDepartmentZod = {
  academicDepartmentValidation,
};
