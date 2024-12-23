import { Router } from "express";
import {
  changeProductState,
  createProduct,
  getAllActiveProducts,
  getAllProductsActiveInactive,
  updateProduct,
} from "../services/products";
import { upload } from "../utils/fileHandler";
import { checkSchema } from "express-validator";
import { CREATE_PRODUCT_SCHEMA } from "../validationSchema/product/createProduct";
import { validateAllParams } from "../middlewares/validateAllParams";
import { parseBodyToJson } from "../utils/parseBody";
import { UPDATE_PRODUCT_SCHEMA } from "../validationSchema/product/updateProduct";
import { UPDATE_STATE_PRODUCT_SCHEMA } from "../validationSchema/product/updateStateProduct";
import { validateToken } from "../middlewares/validateToken";
import { Roles } from "../enums/role";
import { hasRole } from "../middlewares/validateRole";
const router = Router();

router.get("/", validateToken, hasRole([Roles.Operador, Roles.Usuario]), getAllActiveProducts);
router.get("/allProducts", validateToken, hasRole([Roles.Operador]), getAllProductsActiveInactive);
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  upload.single("image"),
  parseBodyToJson,
  checkSchema(CREATE_PRODUCT_SCHEMA),
  [validateAllParams],
  createProduct,
);
router.put(
  "/changestate/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_STATE_PRODUCT_SCHEMA),
  validateAllParams,
  changeProductState,
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  [upload.single("image")],
  parseBodyToJson,
  checkSchema(UPDATE_PRODUCT_SCHEMA),
  validateAllParams,
  updateProduct,
);
export { router };
