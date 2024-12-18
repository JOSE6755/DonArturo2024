import { Router } from "express";
import { StateController } from "../controllers/state.controller";
import { IStateOperations, StateService } from "../services/state";
import { checkSchema } from "express-validator";
import { CREATE_STATE_SCHEMA } from "../validationSchema/state/createState";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_STATE_SCHEMA } from "../validationSchema/state/updateState";

export const router = Router();
const service: IStateOperations = new StateService();
const controller = new StateController(service);
router.get("/", controller.getStates.bind(controller));
router.post("/", checkSchema(CREATE_STATE_SCHEMA), validateAllParams, controller.createState.bind(controller));
router.put("/:id", checkSchema(UPDATE_STATE_SCHEMA), validateAllParams, controller.updateState.bind(controller));
