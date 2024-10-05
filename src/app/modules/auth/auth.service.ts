import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRole, TUser } from "./auth.interface";
import { AuthModel } from "./auth.model";
import { JwtPayload } from "jsonwebtoken";
import { createToken, omitPassword } from "./auth.utils";
import config from "../../config";

const signupUserIntoDB = async (payload: TUser) => {
  const existingUser = await AuthModel.isUserExist(payload.email);

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const result = await AuthModel.create(payload);

  return omitPassword(result);
};

const loginUserService = async (payload: JwtPayload) => {
  const existingUser = await AuthModel.isUserExist(payload.email);

  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Email");
  }

  const correctPassword = await AuthModel.isPasswordMatch(
    payload.password,
    existingUser.password,
  );

  if (!correctPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Password");
  }

  const jwtPayload = {
    email: existingUser.email,
    role: existingUser.role as string,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "5h",
  );

  const loggedUserWithoutPassword = omitPassword(existingUser);

  return { token, user: loggedUserWithoutPassword };
};

const getAllUsers = async () => {
  const users = await AuthModel.find({}, "-password");
  return users;
};

const updateUserRole = async (
  userId: string,
  newRole: TRole,
  adminEmail: string,
) => {
  const userToUpdate = await AuthModel.findById(userId);

  if (!userToUpdate) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isAdmin = await AuthModel.isAdmin(adminEmail);

  if (!isAdmin) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only admins can update user roles",
    );
  }

  if (userToUpdate.role === "admin") {
    throw new AppError(httpStatus.FORBIDDEN, "Admin roles cannot be changed");
  }

  await AuthModel.findByIdAndUpdate(
    userId,
    { role: newRole },
    {
      new: true,
      runValidators: true,
    },
  );

  return omitPassword(userToUpdate);
};

export const UserService = {
  signupUserIntoDB,
  loginUserService,
  getAllUsers,
  updateUserRole,
};
