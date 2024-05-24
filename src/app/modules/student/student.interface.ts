import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: number;
  motherName: string;
  motherOccupation: string;
  motherContactNo: number;
};

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: number;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;

  name: TUserName;
  gender: "male" | "female" | "others";
  age: number;
  dateOfBirth: string;
  email?: string;
  contactNo: number;
  emergencyContactNo: number;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string | undefined;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
