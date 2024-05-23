import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {};

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

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
  const result = await User.create(userData);

  //create a new student
  if (Object.keys(result).length) {
    payload.id = result.id;
    payload.user = result._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
