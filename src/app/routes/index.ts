import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../modules/AcademicDepartment/academicDepartment.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-dept",
    route: AcademicDepartmentRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// router.use("/students", studentRoutes);
// router.use("/users", userRoutes);

export default router;
