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
const getSingleAcademicSemesterService = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  return result;
};
const updateSingleAcademicSemesterService = async (
  id: string,
  name: string,
  year: string,
  code: string,
  startMonth: string,
  endMonth: string
) => {
  const result = await AcademicSemester.updateOne(
    { id },
    {
      name: name,
      year: year,
      code: code,
      startMonth: startMonth,
      endMonth: endMonth,
    }
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterService,
  getSingleAcademicSemesterService,
  updateSingleAcademicSemesterService,
};
