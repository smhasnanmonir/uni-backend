/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { userControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
const router = express.Router();

router.post(
  "/create-user",
  auth("admin"),
  validateRequest(studentValidations.StudentZodSchema),
  userControllers.createStudent
);

router.post("/create-faculty", userControllers.createFaculty);

router.post("/create-admin", userControllers.createAdmin);

export const userRoutes = router;
