"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("./auth.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const signupUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield auth_model_1.AuthModel.isUserExist(payload.email);
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists.");
    }
    const result = yield auth_model_1.AuthModel.create(payload);
    return (0, auth_utils_1.omitPassword)(result);
});
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield auth_model_1.AuthModel.isUserExist(payload.email);
    if (!existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid Email");
    }
    const correctPassword = yield auth_model_1.AuthModel.isPasswordMatch(payload.password, existingUser.password);
    if (!correctPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid Password");
    }
    const jwtPayload = {
        email: existingUser.email,
        role: existingUser.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, "5h");
    const loggedUserWithoutPassword = (0, auth_utils_1.omitPassword)(existingUser);
    return { token, user: loggedUserWithoutPassword };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield auth_model_1.AuthModel.find({}, "-password");
    return users;
});
const updateUserRole = (userId, newRole, adminEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = yield auth_model_1.AuthModel.findById(userId);
    if (!userToUpdate) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isAdmin = yield auth_model_1.AuthModel.isAdmin(adminEmail);
    if (!isAdmin) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Only admins can update user roles");
    }
    if (userToUpdate.role === "admin") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Admin roles cannot be changed");
    }
    yield auth_model_1.AuthModel.findByIdAndUpdate(userId, { role: newRole }, {
        new: true,
        runValidators: true,
    });
    return (0, auth_utils_1.omitPassword)(userToUpdate);
});
exports.UserService = {
    signupUserIntoDB,
    loginUserService,
    getAllUsers,
    updateUserRole,
};
