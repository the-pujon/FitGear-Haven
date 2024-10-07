"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoleValidation = exports.LoginValidation = exports.SignupValidation = void 0;
const zod_1 = require("zod");
exports.SignupValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        role: zod_1.z.enum(["user", "admin"]).optional(),
        totalBuy: zod_1.z.number().optional(),
    }),
});
exports.LoginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
    }),
});
exports.UpdateUserRoleValidation = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["user", "admin"]),
    }),
});
