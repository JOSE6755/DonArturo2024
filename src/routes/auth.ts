import { Router } from "express";
import { AuthService } from "../services/auth";
import { UserService } from "../services/user";
import { AuthController } from "../controllers/auth.controller";

export const router = Router();
const userService = new UserService();
const service = new AuthService(userService);
const controller = new AuthController(service);

router.post("/login", controller.login.bind(controller));
