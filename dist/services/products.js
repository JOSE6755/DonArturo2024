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
exports.ProductService = void 0;
const products_1 = require("../models/products");
const config_1 = require("../database/config");
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProductService {
    getAllActiveProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ price = "DESC", name = "%%", categories = [], page = 1, size = 10, }) {
            const products = yield this.getAllProducts(true, { price, name, categories, page, size });
            return products;
        });
    }
    getAllProductsActiveInactive(_a) {
        return __awaiter(this, arguments, void 0, function* ({ price = "DESC", name = "%%", categories = [], page = 1, size = 10, }) {
            const products = yield this.getAllProducts(false, { price, name, categories, page, size });
            return products;
        });
    }
    getAllProducts() {
        return __awaiter(this, arguments, void 0, function* (onlyActive = false, options) {
            console.log(options);
            let queryWithoutIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand FROM FilterProducts fp WHERE fp.Name LIKE :name GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
            const bindWithoutIn = { name: options.name, offset: (options.page - 1) * options.size, size: options.size };
            let queryWithIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand FROM FilterProducts fp WHERE fp.Name LIKE :name AND fp.CategoryId IN (:categories) GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
            const bindWithIn = {
                name: options.name,
                categories: options.categories,
                offset: (options.page - 1) * options.size,
                size: options.size,
            };
            if (onlyActive) {
                queryWithoutIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand FROM FilterProducts fp WHERE fp.StateId= 1 AND fp.Name LIKE :name GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
                queryWithIn = `SELECT fp.productId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand FROM FilterProducts fp WHERE fp.stateId = 1 AND fp.Name LIKE :name AND fp.CategoryId IN (:categories) GROUP BY fp.ProductId,fp.Name,fp.Code,fp.Stock,fp.Price,fp.[Image],fp.StateId,fp.Brand ORDER BY fp.Price ${options.price} OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY`;
            }
            const finalQuery = options.categories.length > 0 ? queryWithIn : queryWithoutIn;
            const finalBind = options.categories.length > 0 ? bindWithIn : bindWithoutIn;
            console.log(finalQuery);
            console.log(finalBind);
            const products = yield config_1.db.query(finalQuery, {
                raw: true,
                type: sequelize_1.QueryTypes.SELECT,
                replacements: finalBind,
            });
            const queryCountWithoutIn = onlyActive
                ? "SELECT COUNT(*) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.StateId = 1 AND p.Name LIKE :name"
                : "SELECT COUNT(*) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.Name LIKE :name";
            const queryCountWithIn = onlyActive
                ? "SELECT COUNT(*) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.StateId = 1 AND p.Name LIKE :name AND cp.CategoryId IN (:categories)"
                : "SELECT COUNT(*) as total FROM Product p INNER JOIN CategoryProduct cp ON cp.ProductId = p.ProductId WHERE p.Name LIKE :name AND cp.CategoryId IN (:categories)";
            const finalQueryCount = options.categories.length > 0 ? queryCountWithIn : queryCountWithoutIn;
            const finalCountBind = options.categories.length > 0 ? { name: options.name, categories: options.categories } : { name: options.name };
            const total = yield config_1.db.query(finalQueryCount, {
                type: sequelize_1.QueryTypes.SELECT,
                raw: true,
                plain: true,
                replacements: finalCountBind,
            });
            console.log(total);
            // const [products]: [Product[]] = await Promise.all([
            //   Product.findAll({
            //     include: [
            //       {
            //         model: Brand,
            //         as: "brand",
            //         attributes: ["name"],
            //       },
            //       {
            //         model: State,
            //         as: "state",
            //         attributes: ["name"],
            //       },
            //       {
            //         model: Category,
            //         as: "categories",
            //         attributes: ["name"],
            //         through: {
            //           attributes: [],
            //         },
            //       },
            //     ],
            //     where: onlyActive ? { stateId: { [Op.eq]: 1 } } : {},
            //     limit: 10,
            //     offset: 0,
            //   }),
            // ]);
            const result = {
                products: products,
                total: total.total,
                page: options.page,
                size: 10,
            };
            return result;
        });
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stringCategories = data.categories.join(",");
                //const productInfo = req.body.productInfo;
                //const { name, code, stock, price, stateId, brandId } = productInfo;
                const result = yield config_1.db.query("EXEC CreateProducts @Name = $1, @Code = $2, @Stock = $3, @Price = $4, @Image = $5, @BrandId = $6, @Categories = $7", {
                    bind: [data.name, data.code, data.stock, data.price, data.image, data.brandId, stringCategories],
                    type: sequelize_1.QueryTypes.SELECT,
                    raw: true,
                    plain: true,
                });
                return result;
            }
            catch (error) {
                console.error(error);
                yield fs_1.default.promises.unlink(path_1.default.join(__dirname, "../productImage", data.image));
                throw new Error(`Error during product creation: ${error.message}`);
            }
        });
    }
    updateProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.existProduct(data.productId);
            if (!product) {
                throw new Error(`Product ${data.productId} not found`);
            }
            if (data.image && product.image) {
                try {
                    const imagePath = path_1.default.join(__dirname, "../productImage", product.image);
                    yield fs_1.default.promises.unlink(imagePath);
                }
                catch (error) {
                    throw new Error(`It was not possible to delete the image: ${error.message}`);
                }
            }
            try {
                const params = data.image
                    ? [
                        data.productId,
                        data.name,
                        data.code,
                        data.stock,
                        data.price,
                        data.image,
                        data.brandId,
                        data.categories.join(","),
                    ]
                    : [
                        data.productId,
                        data.name,
                        data.code,
                        data.stock,
                        data.price,
                        product.image,
                        data.brandId,
                        data.categories.join(","),
                    ];
                const result = yield config_1.db.query("EXEC UpdateProduct @ProductId = $1, @Name = $2, @Code = $3, @Stock = $4, @Price = $5, @Image = $6, @BrandId = $7,@Categories = $8", { bind: params, type: sequelize_1.QueryTypes.SELECT, raw: true, plain: true });
                return result;
            }
            catch (error) {
                console.error(error);
                if (data.image) {
                    yield fs_1.default.promises.unlink(path_1.default.join(__dirname, "../productImage", data.image));
                }
                throw new Error(`Error during product update: ${error.message}`);
                //res.status(500).json({ msg: `Error during product update: ${error.message}` });
            }
        });
    }
    changeProductState(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.existProduct(data.productId))) {
                throw new Error(`Product ${data.productId} not found`);
            }
            try {
                const result = yield config_1.db.query("EXEC UpdateProductState @ProductId = $1, @StateId = $2;", {
                    bind: [data.productId, data.stateId],
                    type: sequelize_1.QueryTypes.SELECT,
                    raw: true,
                    plain: true,
                });
                return result;
            }
            catch (error) {
                throw new Error(`Error changing product state: ${error.message}`);
            }
        });
    }
    existProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_1.Product.findByPk(productId);
                return product;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error fetching product ${productId}: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.js.map