import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

export const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "Faculties",
  academicFacultySchema
);
