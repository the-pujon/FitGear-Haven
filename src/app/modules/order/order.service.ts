import { Order } from "./order.interface";
import { OrderModel } from "./order.model";
import { AuthModel } from "../auth/auth.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import ProductModel from "../product/product.model";

const createOrder = async (
  orderData: Order,
  userEmail: string,
): Promise<Order> => {
  const session = await OrderModel.startSession();
  session.startTransaction();

  const totalProducts = orderData.products.length;

  try {
    // Create the order
    const order = await OrderModel.create([orderData], { session });

    // Update product quantities
    for (const product of orderData.products) {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        product.product,
        { $inc: { stock: -product.quantity } },
        { new: true, session },
      );

      if (!updatedProduct || updatedProduct.stock < 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for product: ${product.name}`,
        );
      }
    }

    // Update user's totalBuy
    const updatedUser = await AuthModel.findOneAndUpdate(
      { email: userEmail },
      { $inc: { totalBuy: totalProducts } },
      { new: true, session },
    );

    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllOrders = async (): Promise<Order[]> => {
  return OrderModel.find().populate("products.product");
};

const getSingleOrder = async (id: string): Promise<Order | null> => {
  return OrderModel.findById(id).populate("products.product");
};

const updateOrder = async (
  id: string,
  updateData: Partial<Order>,
): Promise<Order | null> => {
  return OrderModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
