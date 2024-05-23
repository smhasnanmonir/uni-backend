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
const getSingleAcademicSemesterController = catchAsync(async (req, res) => {
  const id: string = req.params._id;
  const result = await AcademicSemesterService.getSingleAcademicSemesterService(
    id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester fetched successfully",
    data: result,
  });
});

const updateSingleAcademicSemesterController = catchAsync(async (req, res) => {
  const id: string = req.params._id;
  const name: string = req.body.name;
  const year: string = req.body.year;
  const code: string = req.body.code;
  const startMonth: string = req.body.startMonth;
  const endMonth: string = req.body.endMonth;
  const result =
    await AcademicSemesterService.updateSingleAcademicSemesterService(
      id,
      name,
      year,
      code,
      startMonth,
      endMonth
    );
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
  getSingleAcademicSemesterController,
  updateSingleAcademicSemesterController,
};
