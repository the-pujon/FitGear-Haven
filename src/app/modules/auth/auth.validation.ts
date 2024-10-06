import { z } from "zod";

export const SignupValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["user", "admin"]).optional(),
    totalBuy: z.number().optional(),
  }),
});

export const LoginValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const UpdateUserRoleValidation = z.object({
  //params: z.object({
  //  userId: z.string(),
  //}),
  body: z.object({
    role: z.enum(["user", "admin"]),
  }),
});
