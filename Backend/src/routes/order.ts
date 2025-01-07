import { Router } from "express";
import { OrderService } from "../services/order";
import { UserService } from "../services/user";
import { OrderController } from "../controllers/order.controller";
import { checkSchema } from "express-validator";
import { GET_ALL_ORDERS_SCHEMA } from "../validationSchema/order/getAllOrders";
import { validateAllParams } from "../middlewares/validateAllParams";
import { GET_ORDER_DETAIL_SCHEMA } from "../validationSchema/order/getOrderDetail";
import { GET_ALL_ORDERS_BY_USER_SCHEMA } from "../validationSchema/order/getAllOrdersByUser";
import { CREATE_ORDER_SCHEMA } from "../validationSchema/order/createOrder";
import { UPDATE_ORDER_STATE_SCHEMA } from "../validationSchema/order/updateOrderState";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const userService = new UserService();
const service = new OrderService(userService);
const controller = new OrderController(service);
router.get(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(GET_ALL_ORDERS_SCHEMA),
  validateAllParams,
  controller.getAllOrders.bind(controller),
);
router.get("/user", validateToken, hasRole([Roles.Usuario]), controller.getAllOrderByUser.bind(controller));
router.get(
  "/:id",
  validateToken,
  hasRole([Roles.Operador, Roles.Usuario]),
  checkSchema(GET_ORDER_DETAIL_SCHEMA),
  validateAllParams,
  controller.getOrderDetail.bind(controller),
);
router.post(
  "/",
  validateToken,
  hasRole([Roles.Usuario]),
  checkSchema(CREATE_ORDER_SCHEMA),
  validateAllParams,
  controller.createOrder.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_ORDER_STATE_SCHEMA),
  validateAllParams,
  controller.updateOrderState.bind(controller),
);
