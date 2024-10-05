import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductInDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    query = { name: { $regex: searchTerm, $options: "i" } };
  }

  const result = await ProductModel.find(query);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

const updateProductInDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
