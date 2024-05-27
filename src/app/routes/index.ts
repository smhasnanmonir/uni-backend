import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../modules/AcademicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";

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
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// router.use("/students", studentRoutes);
// router.use("/users", userRoutes);

export default router;
