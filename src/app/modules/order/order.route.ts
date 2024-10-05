import express from "express";
import { OrderController } from "./order.controller";
//import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from "./order.validation";
import validateRequest from "../../middlewares/validateRequess";

const router = express.Router();

router.post(
  "/create",
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder,
);
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getSingleOrder);
router.patch(
  "/:id",
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder,
);

export const OrderRoutes = router;
