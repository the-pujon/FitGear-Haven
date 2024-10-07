"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const validateRequess_1 = __importDefault(require("../../middlewares/validateRequess"));
const authorization_1 = require("../../middlewares/authorization");
const router = (0, express_1.Router)();
router.post("/create", (0, authorization_1.authorization)("admin"), (0, validateRequess_1.default)(product_validation_1.ProductValidation.createProductZodSchema), product_controller_1.ProductController.createProduct);
router.get("/", product_controller_1.ProductController.getAllProducts);
router.get("/:id", product_controller_1.ProductController.getSingleProduct);
router.patch("/:id", (0, authorization_1.authorization)("admin"), (0, validateRequess_1.default)(product_validation_1.ProductValidation.updateProductZodSchema), product_controller_1.ProductController.updateProduct);
router.delete("/:id", (0, authorization_1.authorization)("admin"), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
