/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import catchAsync from "../../middleware/catchAsync";

const getStudentController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await studentServices.getAllStudentsFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result,
    });
  }
);

const getSingleStudentController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id: string = req.params.id;
    const result = await studentServices.getSingleStudentFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student fetched successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found",
        data: [],
      });
    }
  }
);

//delete student
const deleteSingleStudentController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id: string = req.params.id;
    const result = await studentServices.deleteSingleStudentFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found, no student deleted",
        data: [],
      });
    }
  }
);
//update student
const updateSingleStudentController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id: string = req.params.id;
    const result = await studentServices.updateSingleStudentFromDB(
      id,
      req.body
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found, no student deleted",
        data: [],
      });
    }
  }
);

//export controllers

export const studentControllers = {
  getStudentController,
  getSingleStudentController,
  deleteSingleStudentController,
  updateSingleStudentController,
};
