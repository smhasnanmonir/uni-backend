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
exports.AcademicSemesterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../middleware/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicSemester_service_1 = require("./academicSemester.service");
const createAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterService.createAcademicSemesterIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Semester created successfully",
        data: result,
    });
}));
const getAcademicSemesterController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterService.getAcademicSemesterService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Semester fetched successfully",
        data: result,
    });
}));
const getSingleAcademicSemesterController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const result = yield academicSemester_service_1.AcademicSemesterService.getSingleAcademicSemesterService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Semester fetched successfully",
        data: result,
    });
}));
const updateSingleAcademicSemesterController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const name = req.body.name;
    const year = req.body.year;
    const code = req.body.code;
    const startMonth = req.body.startMonth;
    const endMonth = req.body.endMonth;
    const result = yield academicSemester_service_1.AcademicSemesterService.updateSingleAcademicSemesterService(id, name, year, code, startMonth, endMonth);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Semester fetched successfully",
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createAcademicSemester,
    getAcademicSemesterController,
    getSingleAcademicSemesterController,
    updateSingleAcademicSemesterController,
};
