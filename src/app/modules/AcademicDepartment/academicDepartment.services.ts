import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id });
  return result;
};

const updateAcademicDepartment = async (id: string, name: string) => {
  const result = await AcademicDepartment.updateOne(
    {
      _id: id,
    },
    {
      name: name,
    }
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateAcademicDepartment,
};
