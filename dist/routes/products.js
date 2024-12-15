"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_1 = require("../services/products");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", products_1.getAllProducts);
router.post("/", products_1.createProduct);
router.put("/:id", products_1.updateProduct);
//# sourceMappingURL=products.js.map