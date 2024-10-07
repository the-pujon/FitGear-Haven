import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>(
  {
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "Stripe"], required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<Order>("Order", orderSchema);
