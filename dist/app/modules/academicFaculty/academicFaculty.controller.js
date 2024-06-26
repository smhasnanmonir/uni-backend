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
exports.academicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../middleware/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const createAcademicFacultyController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyServices.createAcademicFacultyIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty is created successfully",
        data: result,
    });
}));
const getAcademicFacultyController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyServices.getFacultiesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty is created successfully",
        data: result,
    });
}));
const getSingleAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const result = yield academicFaculty_service_1.academicFacultyServices.getSingleFacultyFromDB(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Faculty fetched successfully",
        data: result,
    });
}));
const updateSingleAcademicSemesterController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const name = req.body.name;
    const result = yield academicFaculty_service_1.academicFacultyServices.updateAcademicFaculty(id, name);
    if (result.modifiedCount === 1) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Academic Faculty updated successfully",
            data: result,
        });
    }
}));
exports.academicFacultyController = {
    createAcademicFacultyController,
    getAcademicFacultyController,
    getSingleAcademicFaculty,
    updateSingleAcademicSemesterController,
};
