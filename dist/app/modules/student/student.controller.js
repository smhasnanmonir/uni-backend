"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../middleware/catchAsync"));
const getStudentController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.studentServices.getAllStudentsFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: result,
    });
}));
const getSingleStudentController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.studentServices.getSingleStudentFromDB(id);
    if (result) {
        res.status(200).json({
            success: true,
            message: "Student fetched successfully",
            data: result,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Student not found",
            data: [],
        });
    }
}));
//delete student
const deleteSingleStudentController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.studentServices.deleteSingleStudentFromDB(id);
    if (result) {
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Student not found, no student deleted",
            data: [],
        });
    }
}));
//update student
const updateSingleStudentController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.studentServices.updateSingleStudentFromDB(id, req.body);
    if (result) {
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Student not found, no student deleted",
            data: [],
        });
    }
}));
//export controllers
exports.studentControllers = {
    getStudentController,
    getSingleStudentController,
    deleteSingleStudentController,
    updateSingleStudentController,
};
