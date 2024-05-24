"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post("/create-academic-department", (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentZod.academicDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartmentController);
router.get("/get-academic-department", academicDepartment_controller_1.academicDepartmentController.getAcademicDepartmentController);
router.get("/get-single-academic-department/:id", academicDepartment_controller_1.academicDepartmentController.getSingleAcademicDepartment);
router.patch("/update-single-academic-department/:id", academicDepartment_controller_1.academicDepartmentController.updateSingleAcademicDepartmentController);
exports.AcademicDepartmentRouter = router;
