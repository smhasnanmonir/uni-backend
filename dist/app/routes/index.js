"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_router_1 = require("../modules/academicFaculty/academicFaculty.router");
const academicDepartment_routes_1 = require("../modules/AcademicDepartment/academicDepartment.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/students",
        route: student_route_1.studentRoutes,
    },
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/academic-semesters",
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        route: academicFaculty_router_1.academicFacultyRoutes,
    },
    {
        path: "/academic-dept",
        route: academicDepartment_routes_1.AcademicDepartmentRouter,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
// router.use("/students", studentRoutes);
// router.use("/users", userRoutes);
exports.default = router;
