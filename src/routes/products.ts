import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../services/products";
const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
export { router };
