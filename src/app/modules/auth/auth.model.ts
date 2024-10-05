import { model, Schema } from "mongoose";
import { AuthStaticMethods, TUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const authSchema = new Schema<TUser, AuthStaticMethods>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  role: {
    type: String,
    default: "user",
  },
  totalBuy: {
    type: String,
    default: 0,
  },
});

//hashing password before saving user data into db
authSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

authSchema.post("save", function (doc, next) {
  doc.set("passwords", undefined, { strict: false });
  next();
});

authSchema.statics.isUserExist = async function (email: string) {
  return await AuthModel.findOne({ email }).select("+password");
};

authSchema.statics.isPasswordMatch = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

authSchema.statics.isAdmin = async function (userEmail: string) {
  const user = await AuthModel.findOne({ email: userEmail });
  return user?.role === "admin";
};

export const AuthModel = model<TUser, AuthStaticMethods>("User", authSchema);
