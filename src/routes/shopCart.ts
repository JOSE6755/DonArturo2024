import { Router } from "express";
import { IShopCartOperations, ShopCartService } from "../services/shopCart";
import { ShopCartController } from "../controllers/shopCart.controller";
import { checkSchema } from "express-validator";
import { GET_SHOPCART_SCHEMA } from "../validationSchema/shopCart/getShopCart";
import { validateAllParams } from "../middlewares/validateAllParams";
import { INSERT_SHOPCART_SCHEMA } from "../validationSchema/shopCart/insertShopCart";
import { UPDATE_SCHOPCART_SCHEMA } from "../validationSchema/shopCart/updateShopCart";
import { EMPTY_SHOPCART_SCHEMA } from "../validationSchema/shopCart/emptyShopCart";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service: IShopCartOperations = new ShopCartService();
const controller = new ShopCartController(service);
router.get(
  "/:id",
  validateToken,
  hasRole([Roles.Usuario]),
  checkSchema(GET_SHOPCART_SCHEMA),
  validateAllParams,
  controller.getShopCart.bind(controller),
);
router.post(
  "/:id",
  validateToken,
  hasRole([Roles.Usuario]),
  checkSchema(INSERT_SHOPCART_SCHEMA),
  validateAllParams,
  controller.insertShopCart.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Usuario]),
  checkSchema(UPDATE_SCHOPCART_SCHEMA),
  validateAllParams,
  controller.updateShopCart.bind(controller),
);
router.put(
  "/removeProduct/:id",
  validateToken,
  hasRole([Roles.Usuario]),
  controller.removeShopCartRecord.bind(controller),
);
router.put(
  "/emptyCart/:id",
  validateToken,
  hasRole([Roles.Usuario]),
  checkSchema(EMPTY_SHOPCART_SCHEMA),
  validateAllParams,
  controller.emptyShopCart.bind(controller),
);
