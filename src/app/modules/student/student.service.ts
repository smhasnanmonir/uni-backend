import { Student } from "./student.model";

//fetch all students from database
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

//fetch single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

//delete api
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    }
  );
  return result;
};

//file export

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
