/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import mongoose from "mongoose";
import { Admin } from "../Admin/admin.model";
import { TAdmin } from "../Admin/admin.interface";
import { Faculty } from "../Faculty/faculty.model";
import { AcademicDepartment } from "../AcademicDepartment/academicDepartment.model";
import { TFaculty } from "../Faculty/faculty.interface";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {};

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  //transaction and rollback

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    } else {
      console.error("Admission semester is null");
      return null;
    }

    if (!password) {
      userData.password = config.defaultPassword as string;
    } else {
      userData.password = password as string;
    }
    userData.role = "student";
    const result = await User.create([userData], { session });

    if (!result) {
      throw new Error("User Failed");
    }

    //create a new student
    if (result.length) {
      payload.id = result[0].id;
      payload.user = result[0]._id;
      const newStudent = await Student.create([payload], { session });
      if (!newStudent) {
        throw new Error("New student Failed");
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
};
