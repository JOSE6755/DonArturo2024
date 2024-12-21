import { Router } from "express";
import { IShopCartOperations, ShopCartService } from "../services/shopCart";
import { ShopCartController } from "../controllers/shopCart.controller";
import { checkSchema } from "express-validator";
import { GET_SHOPCART_SCHEMA } from "../validationSchema/shopCart/getShopCart";
import { validateAllParams } from "../middlewares/validateAllParams";
import { INSERT_SHOPCART_SCHEMA } from "../validationSchema/shopCart/insertShopCart";
import { UPDATE_SCHOPCART_SCHEMA } from "../validationSchema/shopCart/updateShopCart";
import { EMPTY_SHOPCART_SCHEMA } from "../validationSchema/shopCart/emptyShopCart";

export const router = Router();
const service: IShopCartOperations = new ShopCartService();
const controller = new ShopCartController(service);
router.get("/:id", checkSchema(GET_SHOPCART_SCHEMA), validateAllParams, controller.getShopCart.bind(controller));
router.post("/:id", checkSchema(INSERT_SHOPCART_SCHEMA), validateAllParams, controller.insertShopCart.bind(controller));
router.put("/:id", checkSchema(UPDATE_SCHOPCART_SCHEMA), validateAllParams, controller.updateShopCart.bind(controller));
router.put("/removeProduct/:id", controller.removeShopCartRecord.bind(controller));
router.put(
  "/emptyCart/:id",
  checkSchema(EMPTY_SHOPCART_SCHEMA),
  validateAllParams,
  controller.emptyShopCart.bind(controller),
);
