import { Schema, model } from "mongoose";

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "first name can not be more than 20"],
    validate: function (value: string) {
      console.log(value);
    },
  },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: Number, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: Number, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: Number, required: true },
  address: { type: String, required: true },
});

export const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: { type: String, unique: true, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },

    name: {
      type: UserNameSchema,
      required: [true, "user id is needed."],
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    age: { type: Number, required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: Number, required: true },
    emergencyContactNo: { type: Number, required: true },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual

studentSchema.virtual("fullName").get(function () {
  return (
    this.name.firstName + " " + this.name.middleName + " " + this.name.lastName
  );
});

//pre save middleware configuration

studentSchema.methods.isUserExists = async function (id: string) {
  const result = await Student.findOne({ id });
  return result;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
