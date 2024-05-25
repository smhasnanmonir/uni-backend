import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";

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

export const userService = {
  createStudentIntoDB,
};
