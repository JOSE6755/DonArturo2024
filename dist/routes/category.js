"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const category_1 = require("../services/category");
const express_validator_1 = require("express-validator");
const createCategory_1 = require("../validationSchema/category/createCategory");
const validateAllParams_1 = require("../middlewares/validateAllParams");
const updateCategory_1 = require("../validationSchema/category/updateCategory");
const updateCategoryState_1 = require("../validationSchema/category/updateCategoryState");
exports.router = (0, express_1.Router)();
const service = new category_1.CategoryService();
const controller = new category_controller_1.CategoryController(service);
exports.router.get("/", controller.getCategories.bind(controller));
exports.router.post("/", (0, express_validator_1.checkSchema)(createCategory_1.CREATE_CATEGORY_SCHEMA), validateAllParams_1.validateAllParams, controller.createCategory.bind(controller));
exports.router.put("/state/:id", (0, express_validator_1.checkSchema)(updateCategoryState_1.UPDATE_CATEGORY_STATE_SCHEMA), validateAllParams_1.validateAllParams, controller.updateCategoryState.bind(controller));
exports.router.put("/:id", (0, express_validator_1.checkSchema)(updateCategory_1.UPDATE_CATEGORY_SCHEMA), validateAllParams_1.validateAllParams, controller.updateCategory.bind(controller));
//# sourceMappingURL=category.js.map