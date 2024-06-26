"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const router = express_1.default.Router();
// create new semester
router.post("/create-academic-semester", (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterZod.academicSemesterSchemaValidation), academicSemester_controller_1.AcademicSemesterController.createAcademicSemester);
//get semester data
router.get("/get-semester", academicSemester_controller_1.AcademicSemesterController.getAcademicSemesterController);
//get single semester data
router.get("/get-single-semester/:id", academicSemester_controller_1.AcademicSemesterController.getSingleAcademicSemesterController);
//update single semester data
router.patch("/update-single-semester/:id", academicSemester_controller_1.AcademicSemesterController.updateSingleAcademicSemesterController);
exports.AcademicSemesterRoutes = router;
