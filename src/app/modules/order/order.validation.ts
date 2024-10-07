import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    totalAmount: z.number().positive(),
    paymentMethod: z.enum(["COD", "Stripe"]),
    city: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
    products: z.array(
      z.object({
        product: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().positive(),
      }),
    ),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    status: z.enum(["Pending", "Completed", "Cancelled"]).optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
