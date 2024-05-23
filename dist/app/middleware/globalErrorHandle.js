"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle = (err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err,
    });
};
exports.default = errorHandle;
