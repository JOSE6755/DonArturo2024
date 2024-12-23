import { Router } from "express";
import { BrandService } from "../services/brand";
import { BrandController } from "../controllers/brand.controller";
import { checkSchema } from "express-validator";
import { CREATE_BRAND_SCHEMA } from "../validationSchema/brand/createBrand";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_BRAND_SCHEMA } from "../validationSchema/brand/updateBrand";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service = new BrandService();
const controller = new BrandController(service);

router.get("/", validateToken, hasRole([Roles.Operador, Roles.Usuario]), controller.getBrand.bind(controller));
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(CREATE_BRAND_SCHEMA),
  validateAllParams,
  controller.createBrand.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_BRAND_SCHEMA),
  validateAllParams,
  controller.updateBrand.bind(controller),
);
