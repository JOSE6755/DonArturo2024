import { Router } from "express";
import { BrandService } from "../services/brand";
import { BrandController } from "../controllers/brand.controller";
import { checkSchema } from "express-validator";
import { CREATE_BRAND_SCHEMA } from "../validationSchema/brand/createBrand";
import { validateAllParams } from "../middlewares/validateAllParams";
import { UPDATE_BRAND_SCHEMA } from "../validationSchema/brand/updateBrand";

export const router = Router();
const service = new BrandService();
const controller = new BrandController(service);

router.get("/", controller.getBrand.bind(controller));
router.post("/", checkSchema(CREATE_BRAND_SCHEMA), validateAllParams, controller.createBrand.bind(controller));
router.put("/:id", checkSchema(UPDATE_BRAND_SCHEMA), validateAllParams, controller.updateBrand.bind(controller));
