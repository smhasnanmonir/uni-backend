import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicFacultyZod } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyZod.academicFacultyValidation),
  academicFacultyController.createAcademicFacultyController
);
router.get(
  "/get-academic-faculty",
  academicFacultyController.getAcademicFacultyController
);
router.get(
  "/get-single-academic-faculty/:id",
  academicFacultyController.getSingleAcademicFaculty
);
router.patch(
  "/update-single-academic-faculty/:id",
  academicFacultyController.updateSingleAcademicSemesterController
);

export const academicFacultyRoutes = router;
