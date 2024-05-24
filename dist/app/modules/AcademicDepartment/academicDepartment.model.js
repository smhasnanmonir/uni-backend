"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = exports.academicDepartmentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: true,
    },
}, {
    timestamps: true,
});
exports.AcademicDepartment = (0, mongoose_1.model)("AcademicDepartment", exports.academicDepartmentSchema);
