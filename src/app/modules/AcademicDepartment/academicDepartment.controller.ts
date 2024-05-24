import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartmentController = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is created successfully",
    data: result,
  });
});

const getAcademicDepartmentController = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getDepartmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is created successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const _id: string = req.params.id;
  const result = await academicDepartmentServices.getSingleDepartmentFromDB(
    _id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department fetched successfully",
    data: result,
  });
});

const updateSingleAcademicDepartmentController = catchAsync(
  async (req, res) => {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const result = await academicDepartmentServices.updateAcademicDepartment(
      id,
      name
    );
    if (result.modifiedCount === 1) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
      });
    }
  }
);

export const academicDepartmentController = {
  getSingleAcademicDepartment,
  updateSingleAcademicDepartmentController,
  createAcademicDepartmentController,
  getAcademicDepartmentController,
};
