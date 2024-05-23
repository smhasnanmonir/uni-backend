import express from "express";
import { studentControllers } from "./student.controller";
const router = express.Router();

//will call controller
router.get("/", studentControllers.getStudentController);
router.get("/:id", studentControllers.getSingleStudentController);
router.delete("/:id", studentControllers.deleteSingleStudentController);

export const studentRoutes = router;
