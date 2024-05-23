import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester created successfully",
    data: result,
  });
});

const getAcademicSemesterController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAcademicSemesterService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester fetched successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemesterController,
};
