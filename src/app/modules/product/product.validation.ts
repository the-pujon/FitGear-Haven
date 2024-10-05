import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number().positive(),
    category: z.string(),
    brand: z.string(),
    description: z.string(),
    photos: z.array(z.string()).optional(),
    discount: z.number().min(0).max(100).optional(),
    stock: z.number().nonnegative(),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    description: z.string().optional(),
    photos: z.array(z.string()).optional(),
    discount: z.number().min(0).max(100).optional(),
    stock: z.number().nonnegative().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
