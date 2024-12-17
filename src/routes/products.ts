import { Router } from "express";
import {
  changeProductState,
  createProduct,
  getAllActiveProducts,
  updateProduct,
} from "../services/products";
import { upload } from "../utils/fileHandler";
import { checkSchema } from "express-validator";
import { CREATE_PRODUCT_SCHEMA } from "../validationSchema/product/createProduct";
import { validateAllParams } from "../middlewares/validateAllParams";
import { parseBodyToJson } from "../utils/parseBody";
import { UPDATE_PRODUCT_SCHEMA } from "../validationSchema/product/updateProduct";
import { UPDATE_STATE_PRODUCT_SCHEMA } from "../validationSchema/product/updateStateProduct";
const router = Router();

router.get("/", getAllActiveProducts);
router.post(
  "/",
  upload.single("image"),
  parseBodyToJson,
  checkSchema(CREATE_PRODUCT_SCHEMA),
  [validateAllParams],
  createProduct
);
router.put(
  "/changestate/:id",
  checkSchema(UPDATE_STATE_PRODUCT_SCHEMA),
  validateAllParams,
  changeProductState
);
router.put(
  "/:id",
  [upload.single("image")],
  parseBodyToJson,
  checkSchema(UPDATE_PRODUCT_SCHEMA),
  validateAllParams,
  updateProduct
);
export { router };
