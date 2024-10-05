import { Router } from "express";
import { UserController } from "./auth.controller";
//import validateRequest from "../../middlewares/validateRequest";
import {
  SignupValidation,
  LoginValidation,
  UpdateUserRoleValidation,
} from "./auth.validation";
import validateRequest from "../../middlewares/validateRequess";
import { authorization } from "../../middlewares/authorization";
//import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/signup",
  validateRequest(SignupValidation),
  UserController.signupUser,
);
router.post(
  "/login",
  validateRequest(LoginValidation),
  UserController.loginUser,
);
router.get("/users", authorization("admin"), UserController.getAllUsers);
router.patch(
  "/users/:userId/role",
  authorization("admin"),
  validateRequest(UpdateUserRoleValidation),
  UserController.updateUserRole,
);

export const AuthRoutes = router;
