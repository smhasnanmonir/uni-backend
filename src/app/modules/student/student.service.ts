import mongoose from "mongoose";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

//fetch all students from database
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const queryObj = { ...query };

  const searchQuery = Student.find({
    $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    })),
  });

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page) as number;
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);
  //field limit set
  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
    console.log(fields);
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
};

//fetch single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  return result;
};

//delete api
const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!result) {
      throw new Error("Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new Error("Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

//update a single student
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const key of Object.keys(name)) {
      const typedKey = key as keyof typeof name;
      modifiedUpdatedData[`name.${typedKey}`] = name[typedKey];
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const key of Object.keys(guardian)) {
      const typedKey = key as keyof typeof guardian;
      modifiedUpdatedData[`guardian.${typedKey}`] = guardian[typedKey];
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const key of Object.keys(localGuardian)) {
      const typedKey = key as keyof typeof localGuardian;
      modifiedUpdatedData[`localGuardian.${typedKey}`] =
        localGuardian[typedKey];
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

//file export

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
