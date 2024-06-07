import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user: JwtPayload;
}

export const auth = () => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      console.log(token);

      //if token is given or not
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized to view this page."
        );
      }

      //checking validity

      jwt.verify(
        token,
        process.env.JWTACCESSTOKEN as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              "You are not authorized to view this page."
            );
          }
          // DECODED
          req.user = decoded as JwtPayload;
          next();
        }
      );
    }
  );
};
