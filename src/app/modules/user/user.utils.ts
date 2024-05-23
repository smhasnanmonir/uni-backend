import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.slice(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId =
    (await findLastStudent()) || (0).toString().padStart(4, "0");
  let increment_id = (Number(currentId) + 1).toString();
  increment_id = `${payload.year}${payload.code}${increment_id}`;
  return increment_id;
};
