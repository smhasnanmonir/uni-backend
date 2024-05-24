import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentZod } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";
const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(academicDepartmentZod.academicDepartmentValidation),
  academicDepartmentController.createAcademicDepartmentController
);
router.get(
  "/get-academic-department",
  academicDepartmentController.getAcademicDepartmentController
);
router.get(
  "/get-single-academic-department/:id",
  academicDepartmentController.getSingleAcademicDepartment
);
router.patch(
  "/update-single-academic-department/:id",
  academicDepartmentController.updateSingleAcademicDepartmentController
);

export const AcademicDepartmentRouter = router;
