"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
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
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
// router.use("/students", studentRoutes);
// router.use("/users", userRoutes);
exports.default = router;
