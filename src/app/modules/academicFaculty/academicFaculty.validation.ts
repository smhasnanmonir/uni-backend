import { z } from "zod";
const academicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "faculty name must be string",
    }),
  }),
});

export const academicFacultyZod = {
  academicFacultyValidation,
};
