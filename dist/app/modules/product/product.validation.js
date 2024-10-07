"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        category: zod_1.z.string(),
        brand: zod_1.z.string(),
        description: zod_1.z.string(),
        photos: zod_1.z.array(zod_1.z.string()).optional(),
        discount: zod_1.z.number().min(0).max(100).optional(),
        stock: zod_1.z.number().nonnegative(),
    }),
});
const updateProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        category: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        photos: zod_1.z.array(zod_1.z.string()).optional(),
        discount: zod_1.z.number().min(0).max(100).optional(),
        stock: zod_1.z.number().nonnegative().optional(),
    }),
});
exports.ProductValidation = {
    createProductZodSchema,
    updateProductZodSchema,
};
