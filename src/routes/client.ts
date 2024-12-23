import { Router } from "express";
import { ClientService } from "../services/client";
import { ClientController } from "../controllers/client.controller";
import { checkSchema } from "express-validator";
import { CREATE_CLIENT_SCHEMA } from "../validationSchema/client/createClient";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_CLIENT_SCHEMA } from "../validationSchema/client/updateClient";
import { validateToken } from "../middlewares/validateToken";
import { hasRole } from "../middlewares/validateRole";
import { Roles } from "../enums/role";

export const router = Router();
const service = new ClientService();
const controller = new ClientController(service);

router.get("/", validateToken, hasRole([Roles.Operador]), controller.getClients.bind(controller));
router.post(
  "/",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(CREATE_CLIENT_SCHEMA),
  validateAllParams,
  controller.createClient.bind(controller),
);
router.put(
  "/:id",
  validateToken,
  hasRole([Roles.Operador]),
  checkSchema(UPDATE_CLIENT_SCHEMA),
  validateAllParams,
  controller.updateClient.bind(controller),
);
