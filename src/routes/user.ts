import { Router } from "express";
import { UserService } from "../services/user";
import { UserController } from "../controllers/user.controller";
import { validateAllParams } from "../middlewares/validateAllParams";
import { checkSchema } from "express-validator";
import { CREATE_USER_SCHEMA } from "../validationSchema/user/createUser";
import { UPDATE_USER_SCHEMA } from "../validationSchema/user/updateUser";
import { UPDATE_USER_STATE_SCHEMA } from "../validationSchema/user/updateUserState";
import { UPDATE_USER_PASSWORD_SCHEMA } from "../validationSchema/user/updateUserPassword";
import { GET_USER_SCHEMA } from "../validationSchema/user/getUser";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service = new UserService();
const controller = new UserController(service);

router.get("/", validateToken, hasRole([Roles.Operador]), controller.getUsers.bind(controller));
router.get(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(GET_USER_SCHEMA),
  validateAllParams,
  controller.getUser.bind(controller),
);
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(CREATE_USER_SCHEMA),
  validateAllParams,
  controller.createUser.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_USER_SCHEMA),
  validateAllParams,
  controller.updateUser.bind(controller),
);
router.put(
  "/state/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_USER_STATE_SCHEMA),
  validateAllParams,
  controller.updateUserState.bind(controller),
);
router.put(
  "/pass/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_USER_PASSWORD_SCHEMA),
  validateAllParams,
  controller.updateUserPassword.bind(controller),
);
