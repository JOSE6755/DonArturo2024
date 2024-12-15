"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProduct = void 0;
const sequelize_1 = require("sequelize");
const products_1 = require("./products");
const category_1 = require("./category");
const config_1 = require("../database/config");
class CategoryProduct extends sequelize_1.Model {
}
exports.CategoryProduct = CategoryProduct;
CategoryProduct.init({
    categoryProductId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    productId: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: products_1.Product,
            key: "productId",
        },
    },
    categoryId: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: category_1.Category,
            key: "categoryId",
        },
    },
}, { sequelize: config_1.db, tableName: "CategoryProduct", timestamps: false });
//# sourceMappingURL=categoryProduct.js.map