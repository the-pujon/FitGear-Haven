"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        totalAmount: zod_1.z.number().positive(),
        paymentMethod: zod_1.z.enum(["COD", "Stripe"]),
        city: zod_1.z.string(),
        address: zod_1.z.string(),
        phone: zod_1.z.string(),
        email: zod_1.z.string().email(),
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string(),
            name: zod_1.z.string(),
            price: zod_1.z.number().positive(),
            quantity: zod_1.z.number().positive(),
        })),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Pending", "Completed", "Cancelled"]).optional(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
