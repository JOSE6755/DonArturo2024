"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
const products_1 = require("../models/products");
const brand_1 = require("../models/brand");
const category_1 = require("../models/category");
const state_1 = require("../models/state");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield products_1.Product.findAll({
            include: [
                {
                    model: brand_1.Brand,
                    as: "brand",
                },
                {
                    model: state_1.State,
                    as: "state",
                },
                {
                    model: category_1.Category,
                    as: "categories",
                },
            ],
        });
        res.status(200).json({ products });
    });
}
function createProduct(req, res) {
    res.status(200).json({
        msg: "Product created successfully!",
        body: req.body,
    });
}
function updateProduct(req, res) {
    res.status(200).json({
        msg: "Product updated successfully",
        body: req.body,
        id: req.params.id,
    });
}
//# sourceMappingURL=products.js.map