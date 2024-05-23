import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterZod } from "./academicSemester.validation";

const router = express.Router();
router.post(
  "/create-academic-semester",
  validateRequest(academicSemesterZod.academicSemesterSchemaValidation),
  AcademicSemesterController.createAcademicSemester
);
router.get(
  "/get-semester",
  AcademicSemesterController.getAcademicSemesterController
);
export const AcademicSemesterRoutes = router;
