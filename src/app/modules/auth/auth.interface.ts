import { Model } from "mongoose";

export type TRole = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role?: TRole;
  totalBuy?: number;
}

export interface AuthStaticMethods extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isAdmin(userId: string): Promise<boolean>;
}
