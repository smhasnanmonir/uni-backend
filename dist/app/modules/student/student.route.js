"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
//will call controller
router.get("/", student_controller_1.studentControllers.getStudentController);
router.get("/:id", student_controller_1.studentControllers.getSingleStudentController);
router.delete("/:id", student_controller_1.studentControllers.deleteSingleStudentController);
exports.studentRoutes = router;
