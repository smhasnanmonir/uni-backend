import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const JWT_ACCESS_TOKEN =
  "0f3dded307d2bba5c9da554e189f0137f322c25d57fbb562616da15c395a2695";

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({
    id: payload?.id,
  });
  console.log("user", isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }
  // checking if user is already deleted

  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }
  // is user blocked?
  const isBlocked = isUserExists?.status == "blocked";
  if (isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  console.log("password", isPasswordMatched);

  console.log("role", isUserExists?.role);

  const jwtPayload = {
    user_id: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    JWT_ACCESS_TOKEN,
    { expiresIn: "10d" }
  );
  return {
    accessToken,
    needsPasswordChange: isUserExists?.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
