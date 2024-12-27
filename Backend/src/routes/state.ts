import { Router } from "express";
import { StateController } from "../controllers/state.controller";
import { IStateOperations, StateService } from "../services/state";
import { checkSchema } from "express-validator";
import { CREATE_STATE_SCHEMA } from "../validationSchema/state/createState";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_STATE_SCHEMA } from "../validationSchema/state/updateState";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service: IStateOperations = new StateService();
const controller = new StateController(service);
router.get("/", validateToken, hasRole([Roles.Operador, Roles.Usuario]), controller.getStates.bind(controller));
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(CREATE_STATE_SCHEMA),
  validateAllParams,
  controller.createState.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_STATE_SCHEMA),
  validateAllParams,
  controller.updateState.bind(controller),
);
