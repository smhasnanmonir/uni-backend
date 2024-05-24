"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyZod.academicFacultyValidation), academicFaculty_controller_1.academicFacultyController.createAcademicFacultyController);
router.get("/get-academic-faculty", academicFaculty_controller_1.academicFacultyController.getAcademicFacultyController);
router.get("/get-single-academic-faculty/:id", academicFaculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.patch("/update-single-academic-faculty/:id", academicFaculty_controller_1.academicFacultyController.updateSingleAcademicSemesterController);
exports.academicFacultyRoutes = router;
