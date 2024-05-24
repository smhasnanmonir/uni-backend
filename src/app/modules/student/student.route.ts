import express from "express";
import { studentControllers } from "./student.controller";
const router = express.Router();

//will call controller
router.get("/", studentControllers.getStudentController); //fetch all student
router.get("/:id", studentControllers.getSingleStudentController); //fetches a single student
router.delete("/:id", studentControllers.deleteSingleStudentController); //delete a single student

export const studentRoutes = router;
