import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterZod } from "./academicSemester.validation";

const router = express.Router();

// create new semester
router.post(
  "/create-academic-semester",
  validateRequest(academicSemesterZod.academicSemesterSchemaValidation),
  AcademicSemesterController.createAcademicSemester
);
//get semester data
router.get(
  "/get-semester",
  AcademicSemesterController.getAcademicSemesterController
);
//get single semester data
router.get(
  "/get-single-semester/:id",
  AcademicSemesterController.getSingleAcademicSemesterController
);
//update single semester data
router.patch(
  "/update-single-semester/:id",
  AcademicSemesterController.updateSingleAcademicSemesterController
);

export const AcademicSemesterRoutes = router;
