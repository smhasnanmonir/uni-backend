/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};

export default errorHandle;
