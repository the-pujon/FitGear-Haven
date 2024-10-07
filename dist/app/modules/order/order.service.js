"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
//import { ProductModel } from "../product/product.model";
const auth_model_1 = require("../auth/auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createOrder = (orderData, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.OrderModel.startSession();
    session.startTransaction();
    const totalProducts = orderData.products.length;
    try {
        // Create the order
        const order = yield order_model_1.OrderModel.create([orderData], { session });
        // Update product quantities
        for (const product of orderData.products) {
            const updatedProduct = yield product_model_1.default.findByIdAndUpdate(product.product, { $inc: { stock: -product.quantity } }, { new: true, session });
            if (!updatedProduct || updatedProduct.stock < 0) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Insufficient stock for product: ${product.name}`);
            }
        }
        // Update user's totalBuy
        const updatedUser = yield auth_model_1.AuthModel.findOneAndUpdate({ email: userEmail }, { $inc: { totalBuy: totalProducts } }, { new: true, session });
        if (!updatedUser) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        yield session.commitTransaction();
        session.endSession();
        return order[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.find().populate("products.product");
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.findById(id).populate("products.product");
});
const updateOrder = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.findByIdAndUpdate(id, updateData, { new: true });
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
};
