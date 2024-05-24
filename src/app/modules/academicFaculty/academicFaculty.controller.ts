import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyController = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is created successfully",
    data: result,
  });
});

const getAcademicFacultyController = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getFacultiesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is created successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const _id: string = req.params.id;
  const result = await academicFacultyServices.getSingleFacultyFromDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty fetched successfully",
    data: result,
  });
});

const updateSingleAcademicSemesterController = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const name: string = req.body.name;
  const result = await academicFacultyServices.updateAcademicFaculty(id, name);
  if (result.modifiedCount === 1) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty updated successfully",
      data: result,
    });
  }
});

export const academicFacultyController = {
  createAcademicFacultyController,
  getAcademicFacultyController,
  getSingleAcademicFaculty,
  updateSingleAcademicSemesterController,
};
