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
exports.AcademicSemester = exports.academicSemesterSchema = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_const_1 = require("./academicSemester.const");
exports.academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemester_const_1.AcademicSemesterName,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_const_1.AcademicSemesterCode,
    },
    startMonth: {
        type: String,
        enum: academicSemester_const_1.months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: academicSemester_const_1.months,
        required: true,
    },
}, {
    timestamps: true,
});
exports.academicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExists = yield exports.AcademicSemester.findOne({
            year: this.year,
            name: this.name,
        });
        if (isSemesterExists) {
            throw new Error("Semester already exists");
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)("AcademicSemester", exports.academicSemesterSchema);
