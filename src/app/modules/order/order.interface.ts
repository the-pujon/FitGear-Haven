import { Types } from "mongoose";

export interface Order {
  totalAmount: number;
  paymentMethod: "COD" | "Stripe";
  status?: "Pending" | "Completed" | "Cancelled";
  city: string;
  address: string;
  phone: string;
  email: string;
  products: {
    product: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
}
