import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
