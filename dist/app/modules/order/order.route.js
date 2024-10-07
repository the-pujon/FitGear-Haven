"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const validateRequess_1 = __importDefault(require("../../middlewares/validateRequess"));
const authorization_1 = require("../../middlewares/authorization");
const router = express_1.default.Router();
router.post("/create", (0, authorization_1.authorization)("admin", "user"), (0, validateRequess_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
router.get("/", (0, authorization_1.authorization)("admin"), order_controller_1.OrderController.getAllOrders);
router.get("/:id", (0, authorization_1.authorization)("admin"), order_controller_1.OrderController.getSingleOrder);
router.patch("/:id", (0, authorization_1.authorization)("admin"), (0, validateRequess_1.default)(order_validation_1.OrderValidation.updateOrderZodSchema), order_controller_1.OrderController.updateOrder);
exports.OrderRoutes = router;
