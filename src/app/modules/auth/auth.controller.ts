import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./auth.service";

const signupUser = catchAsync(async (req, res) => {
  const result = await UserService.signupUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.loginUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successful",
    token: result.token,
    data: result.user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const adminId = req.user.email;

  const result = await UserService.updateUserRole(userId, role, adminId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User role updated successfully",
    data: result,
  });
});

export const UserController = {
  signupUser,
  loginUser,
  getAllUsers,
  updateUserRole,
};
