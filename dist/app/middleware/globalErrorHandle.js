"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errorHandle = (err, req, res, next) => {
    let statusCode = err.code || 500;
    let message = err.message || "Something went wrong";
    // type TErrorSource = {
    //   path: string | number;
    //   message: string;
    // };
    let errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const handleError = (err) => {
        statusCode = 400;
        const errorSource = err.issues.map((issue) => {
            return {
                path: issue.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        return {
            statusCode,
            message: "Zod validation error",
            errorSource,
        };
    };
    if (err instanceof zod_1.ZodError) {
        const simplyError = handleError(err);
        statusCode = simplyError === null || simplyError === void 0 ? void 0 : simplyError.statusCode;
        message = simplyError === null || simplyError === void 0 ? void 0 : simplyError.message;
        errorSource = simplyError === null || simplyError === void 0 ? void 0 : simplyError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "validationError") {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return res.status(statusCode).json({
        success: false,
        message: message,
        // error: err,
    });
};
exports.default = errorHandle;
