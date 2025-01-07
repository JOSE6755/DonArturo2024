import { Router } from "express";
import { ProductService } from "../services/products";
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
import { ProductController } from "../controllers/product.controller";
import { GET_PRODUCT_SCHEMA } from "../validationSchema/product/getProduct";
import { GET_SINGLE_PRODUCT_SCHEMA } from "../validationSchema/product/getSingleProduct";
const router = Router();
const service = new ProductService();
const controller = new ProductController(service);
router.get(
  "/",
  validateToken,
  hasRole([Roles.Operador, Roles.Usuario]),
  checkSchema(GET_PRODUCT_SCHEMA),
  validateAllParams,
  controller.getAllActiveProducts.bind(controller),
);
router.get(
  "/allProducts",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(GET_PRODUCT_SCHEMA),
  validateAllParams,
  controller.getAllProductsActiveInactive.bind(controller),
);
router.get(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(GET_SINGLE_PRODUCT_SCHEMA),
  validateAllParams,
  controller.getSingleProduct.bind(controller),
);
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  upload.single("image"),
  parseBodyToJson,
  checkSchema(CREATE_PRODUCT_SCHEMA),
  [validateAllParams],
  controller.createProduct.bind(controller),
);
router.put(
  "/changestate/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_STATE_PRODUCT_SCHEMA),
  validateAllParams,
  controller.changeProductState.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  upload.single("image"),
  parseBodyToJson,
  checkSchema(UPDATE_PRODUCT_SCHEMA),
  validateAllParams,
  controller.updateProduct.bind(controller),
);
export { router };
