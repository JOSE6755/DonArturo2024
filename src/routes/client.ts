import { Router } from "express";
import { ClientService } from "../services/client";
import { ClientController } from "../controllers/client.controller";
import { checkSchema } from "express-validator";
import { CREATE_CLIENT_SCHEMA } from "../validationSchema/client/createClient";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_CLIENT_SCHEMA } from "../validationSchema/client/updateClient";

export const router = Router();
const service = new ClientService();
const controller = new ClientController(service);

router.get("/", controller.getClients.bind(controller));
router.post("/", checkSchema(CREATE_CLIENT_SCHEMA), validateAllParams, controller.createClient.bind(controller));
router.put("/:id", checkSchema(UPDATE_CLIENT_SCHEMA), validateAllParams, controller.updateClient.bind(controller));
