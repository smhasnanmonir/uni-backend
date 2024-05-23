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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // set student role
    const userData = {};
    if (!password) {
        userData.password = config_1.default.defaultPassword;
    }
    else {
        userData.password = password;
    }
    userData.role = "student";
    userData.id = "203010001";
    const result = yield user_model_1.User.create(userData);
    //create a new student
    if (Object.keys(result).length) {
        studentData.id = result.id;
        studentData.user = result._id;
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.userService = {
    createStudentIntoDB,
};
