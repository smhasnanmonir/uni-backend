import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user: JwtPayload;
}

const JWT_ACCESS_TOKEN =
  "0f3dded307d2bba5c9da554e189f0137f322c25d57fbb562616da15c395a2695";

export const auth = (...requiredRoles) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      //if token is given or not
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized to view this page."
        );
      }

      //checking validity

      jwt.verify(token, JWT_ACCESS_TOKEN, function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized to view this page."
          );
        }

        console.log(decoded);

        const role = (decoded as JwtPayload).data?.role;

        console.log("decoded role", role);

        console.log(requiredRoles);

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized to view this page."
          );
        }

        // DECODED
        req.user = decoded as JwtPayload;
        next();
      });
    }
  );
};
