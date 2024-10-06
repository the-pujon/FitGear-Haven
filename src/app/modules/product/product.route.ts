import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import validateRequest from "../../middlewares/validateRequess";
import { authorization } from "../../middlewares/authorization";

const router = Router();

router.post(
  "/create",
  authorization("admin"),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

router.patch(
  "/:id",
  authorization("admin"),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct,
);

router.delete("/:id", authorization("admin"), ProductController.deleteProduct);

export const ProductRoutes = router;
