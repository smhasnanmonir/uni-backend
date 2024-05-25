/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";
const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  const handleError = (err: ZodError) => {
    statusCode = 400;
    const errorSource = err.issues.map((issue: ZodIssue) => {
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

  if (err instanceof ZodError) {
    const simplyError = handleError(err);
    statusCode = simplyError?.statusCode;
    message = simplyError?.message;
    errorSource = simplyError?.errorSource;
  } else if (err?.name === "validationError") {
    console.log(err?.message);
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    // error: err,
  });
};

export default errorHandle;
