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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActiveProducts = getAllActiveProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.changeProductState = changeProductState;
const products_1 = require("../models/products");
const brand_1 = require("../models/brand");
const category_1 = require("../models/category");
const state_1 = require("../models/state");
const config_1 = require("../database/config");
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllActiveProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield getAllProducts(true);
        res.status(200).json({ products });
    });
}
function getAllProducts() {
    return __awaiter(this, arguments, void 0, function* (onlyActive = false) {
        const [products] = yield Promise.all([
            products_1.Product.findAll({
                include: [
                    {
                        model: brand_1.Brand,
                        as: "brand",
                        attributes: ["name"],
                    },
                    {
                        model: state_1.State,
                        as: "state",
                        attributes: ["name"],
                    },
                    {
                        model: category_1.Category,
                        as: "categories",
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
                where: onlyActive ? { stateId: { [sequelize_1.Op.eq]: 1 } } : {},
            }),
        ]);
        return products;
    });
}
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file) {
            res.status(400).json({
                msg: "File not provided",
            });
            return;
        }
        const image = req.file.filename;
        try {
            const productInfo = req.body.productInfo;
            const { name, code, stock, price, stateId, brandId } = productInfo;
            const result = yield config_1.db.query("EXEC CreateProducts @Name = $1, @Code = $2, @Stock = $3, @Price = $4, @Image = $5, @StateId = $6, @BrandId = $7", {
                bind: [name, code, stock, price, image, stateId, brandId],
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({
                msg: "Product created successfully!",
                body: result,
            });
        }
        catch (error) {
            yield fs_1.default.promises.unlink(req.file.path);
            res.status(500).json({ msg: `Error during product creation: ${error.message}` });
            console.log(error);
        }
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = Number(req.params.id);
        let product;
        try {
            product = yield products_1.Product.findByPk(productId);
            if (!product) {
                res.status(404).json({ msg: "Product not found" });
                return;
            }
        }
        catch (error) {
            res.status(500).json({ msg: `Error during product search: ${error.message}` });
            return;
        }
        if (req.file) {
            try {
                const imagePath = path_1.default.join(__dirname, "../productImage", product.image);
                yield fs_1.default.promises.unlink(imagePath);
            }
            catch (error) {
                res.status(500).json({
                    msg: `It was not possible to delete the image: ${error.message}`,
                });
                return;
            }
        }
        try {
            const productInfo = req.body.productInfo;
            const { name, code, stock, price, stateId, brandId } = productInfo;
            const params = req.file
                ? [productId, name, code, stock, price, stateId, req.file.filename, brandId]
                : [productId, name, code, stock, price, stateId, product.image, brandId];
            const result = yield config_1.db.query("EXEC UpdateProduct @ProductId = $1, @Name = $2, @Code = $3, @Stock = $4, @Price = $5, @StateId = $6, @Image = $7, @BrandId = $8", { bind: params, type: sequelize_1.QueryTypes.SELECT });
            res.status(200).json({
                msg: "Product updated successfully",
                result: result,
            });
        }
        catch (error) {
            res.status(500).json({ msg: `Error during product update: ${error.message}` });
        }
    });
}
function changeProductState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.id;
        const product = yield products_1.Product.findByPk(productId);
        if (!product) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        const { stateId } = req.body;
        try {
            const result = yield config_1.db.query("EXEC UpdateProductState @ProductId = $1, @StateId = $2;", {
                bind: [productId, stateId],
                type: sequelize_1.QueryTypes.UPDATE,
            });
            res.json({
                msg: "Product updated successfully",
                result: result,
            });
        }
        catch (error) {
            res.json({ msg: `Error changing product state: ${error.message}` });
        }
    });
}
//# sourceMappingURL=products.js.map