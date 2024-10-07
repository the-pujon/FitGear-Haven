"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
//import validateRequest from "../../middlewares/validateRequest";
const auth_validation_1 = require("./auth.validation");
const validateRequess_1 = __importDefault(require("../../middlewares/validateRequess"));
const authorization_1 = require("../../middlewares/authorization");
//import auth from "../../middlewares/auth";
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequess_1.default)(auth_validation_1.SignupValidation), auth_controller_1.UserController.signupUser);
router.post("/login", (0, validateRequess_1.default)(auth_validation_1.LoginValidation), auth_controller_1.UserController.loginUser);
router.get("/users", (0, authorization_1.authorization)("admin"), auth_controller_1.UserController.getAllUsers);
router.patch("/users/:userId/role", (0, authorization_1.authorization)("admin"), (0, validateRequess_1.default)(auth_validation_1.UpdateUserRoleValidation), auth_controller_1.UserController.updateUserRole);
exports.AuthRoutes = router;
