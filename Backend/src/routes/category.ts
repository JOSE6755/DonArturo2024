import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category";
import { checkSchema } from "express-validator";
import { CREATE_CATEGORY_SCHEMA } from "../validationSchema/category/createCategory";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_CATEGORY_SCHEMA } from "../validationSchema/category/updateCategory";
import { UPDATE_CATEGORY_STATE_SCHEMA } from "../validationSchema/category/updateCategoryState";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service = new CategoryService();
const controller = new CategoryController(service);

router.get("/", validateToken, hasRole([Roles.Operador, Roles.Usuario]), controller.getCategories.bind(controller));
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(CREATE_CATEGORY_SCHEMA),
  validateAllParams,
  controller.createCategory.bind(controller),
);
router.put(
  "/state/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_CATEGORY_STATE_SCHEMA),
  validateAllParams,
  controller.updateCategoryState.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_CATEGORY_SCHEMA),
  validateAllParams,
  controller.updateCategory.bind(controller),
);
