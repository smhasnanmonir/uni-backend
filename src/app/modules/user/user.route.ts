/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { userControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(studentValidations.StudentZodSchema),
  userControllers.createStudent
);

export const userRoutes = router;
