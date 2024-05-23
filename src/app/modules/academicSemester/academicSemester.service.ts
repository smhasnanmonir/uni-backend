import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TMapper = {
    [key: string]: string;
  };
  const mapper: TMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };
  if (mapper[payload.name] !== payload.code) {
    throw new Error("Semester code does not match with semester name");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterService = async () => {
  const result = await AcademicSemester.find();
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterService,
};
