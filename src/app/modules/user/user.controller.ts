import { RequestHandler } from "express";
import { userService } from "./user.service";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err);
  }
  // will call service function to send this data
  //send response
};

export const userControllers = {
  createStudent,
};
