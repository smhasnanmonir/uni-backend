import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  return result;
};

const updateAcademicFaculty = async (id: string, name: string) => {
  const result = await AcademicFaculty.updateOne(
    {
      _id: id,
    },
    {
      name: name,
    }
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getFacultiesFromDB,
  getSingleFacultyFromDB,
  updateAcademicFaculty,
};
