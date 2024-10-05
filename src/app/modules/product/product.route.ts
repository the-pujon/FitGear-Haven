import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import validateRequest from "../../middlewares/validateRequess";

const router = Router();

router.post(
  "/create",
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

router.patch(
  "/:id",
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct,
);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
