"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_1 = require("../services/products");
const fileHandler_1 = require("../utils/fileHandler");
const express_validator_1 = require("express-validator");
const createProduct_1 = require("../validationSchema/product/createProduct");
const validateAllParams_1 = require("../middlewares/validateAllParams");
const parseBody_1 = require("../utils/parseBody");
const updateProduct_1 = require("../validationSchema/product/updateProduct");
const updateStateProduct_1 = require("../validationSchema/product/updateStateProduct");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", products_1.getAllActiveProducts);
router.post("/", fileHandler_1.upload.single("image"), parseBody_1.parseBodyToJson, (0, express_validator_1.checkSchema)(createProduct_1.CREATE_PRODUCT_SCHEMA), [validateAllParams_1.validateAllParams], products_1.createProduct);
router.put("/changestate/:id", (0, express_validator_1.checkSchema)(updateStateProduct_1.UPDATE_STATE_PRODUCT_SCHEMA), validateAllParams_1.validateAllParams, products_1.changeProductState);
router.put("/:id", [fileHandler_1.upload.single("image")], parseBody_1.parseBodyToJson, (0, express_validator_1.checkSchema)(updateProduct_1.UPDATE_PRODUCT_SCHEMA), validateAllParams_1.validateAllParams, products_1.updateProduct);
//# sourceMappingURL=products.js.map