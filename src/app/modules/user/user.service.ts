import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {};

  if (!password) {
    userData.password = config.defaultPassword as string;
  } else {
    userData.password = password as string;
  }
  userData.role = "student";
  userData.id = "203010001";
  const result = await User.create(userData);

  //create a new student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
