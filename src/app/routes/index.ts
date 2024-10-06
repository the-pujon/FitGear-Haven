import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
