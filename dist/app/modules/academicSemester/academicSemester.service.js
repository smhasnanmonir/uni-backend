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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterService = void 0;
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const mapper = {
        Autumn: "01",
        Summer: "02",
        Fall: "03",
    };
    if (mapper[payload.name] !== payload.code) {
        throw new Error("Semester code does not match with semester name");
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    return result;
});
const getAcademicSemesterService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.find();
    return result;
});
const getSingleAcademicSemesterService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findOne({ id });
    return result;
});
const updateSingleAcademicSemesterService = (id, name, year, code, startMonth, endMonth) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.updateOne({ id }, {
        name: name,
        year: year,
        code: code,
        startMonth: startMonth,
        endMonth: endMonth,
    });
    return result;
});
exports.AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getAcademicSemesterService,
    getSingleAcademicSemesterService,
    updateSingleAcademicSemesterService,
};
