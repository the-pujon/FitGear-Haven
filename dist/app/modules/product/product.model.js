"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});
const ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = ProductModel;
