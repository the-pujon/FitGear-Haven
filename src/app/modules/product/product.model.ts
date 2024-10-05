import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>({
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

const ProductModel = model<TProduct>("Product", ProductSchema);

export default ProductModel;
