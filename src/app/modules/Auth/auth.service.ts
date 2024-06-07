import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({
    id: payload?.id,
  });
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
  console.log(isPasswordMatched);

  const jwtPayload = {
    user_id: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    process.env.JWT_ACCESS_TOKEN as string,
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
