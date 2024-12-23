"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProduct = exports.CATEGORYPRODUCT_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
const products_1 = require("./products");
const category_1 = require("./category");
exports.CATEGORYPRODUCT_SCHEMA = {
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
};
class CategoryProduct extends sequelize_1.Model {
    static config(db) {
        return {
            sequelize: db,
            tableName: "CategoryProduct",
            timestamps: false,
        };
    }
}
exports.CategoryProduct = CategoryProduct;
//# sourceMappingURL=categoryProduct.js.map