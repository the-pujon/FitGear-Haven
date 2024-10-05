import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { searchTerm } = req.query;
  const result = await ProductService.getAllProductsFromDB(
    searchTerm as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProductInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProductFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
