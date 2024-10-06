import express from "express";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";
import validateRequest from "../../middlewares/validateRequess";
import { authorization } from "../../middlewares/authorization";

const router = express.Router();

router.post(
  "/create",
  authorization("admin", "user"),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder,
);
router.get("/", authorization("admin"), OrderController.getAllOrders);
router.get("/:id", authorization("admin"), OrderController.getSingleOrder);
router.patch(
  "/:id",
  authorization("admin"),
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder,
);

export const OrderRoutes = router;
