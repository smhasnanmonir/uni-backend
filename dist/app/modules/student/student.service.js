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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
//fetch all students from database
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = "";
    if (query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const queryObj = Object.assign({}, query);
    const searchQuery = student_model_1.Student.find({
        $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: "i",
            },
        })),
    });
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    const filterQuery = searchQuery
        .find(queryObj)
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    })
        .populate("user");
    let sort = "-createdAt";
    if (query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 1;
    let skip = 0;
    if (query.limit) {
        limit = Number(query.limit);
    }
    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    //field limit set
    let fields = "-__v";
    if (query.fields) {
        fields = query.fields.split(",").join(" ");
        console.log(fields);
    }
    const fieldQuery = yield limitQuery.select(fields);
    return fieldQuery;
});
//fetch single student
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id })
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    })
        .populate("user");
    return result;
});
//delete api
const deleteSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield student_model_1.Student.findOneAndUpdate({ id }, {
            isDeleted: true,
        }, { new: true, session });
        if (!result) {
            throw new Error("Failed to delete student");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, {
            isDeleted: true,
        }, { new: true, session });
        if (!deletedUser) {
            throw new Error("Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(err);
    }
});
//update a single student
const updateSingleStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const key of Object.keys(name)) {
            const typedKey = key;
            modifiedUpdatedData[`name.${typedKey}`] = name[typedKey];
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const key of Object.keys(guardian)) {
            const typedKey = key;
            modifiedUpdatedData[`guardian.${typedKey}`] = guardian[typedKey];
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const key of Object.keys(localGuardian)) {
            const typedKey = key;
            modifiedUpdatedData[`localGuardian.${typedKey}`] =
                localGuardian[typedKey];
        }
    }
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
//file export
exports.studentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB,
    updateSingleStudentFromDB,
};
