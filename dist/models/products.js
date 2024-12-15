"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const brand_1 = require("./brand");
const category_1 = require("./category");
const state_1 = require("./state");
const config_1 = require("../database/config");
const categoryProduct_1 = require("./categoryProduct");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    productId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    code: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    stock: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: config_1.db,
    tableName: "Product",
    timestamps: false,
});
Product.belongsToMany(category_1.Category, {
    through: categoryProduct_1.CategoryProduct,
    foreignKey: "productId",
    otherKey: "categoryId",
    as: "categories",
});
Product.belongsTo(brand_1.Brand, {
    foreignKey: "brandId",
    as: "brand",
});
Product.belongsTo(state_1.State, {
    as: "state",
    foreignKey: "stateId",
});
//# sourceMappingURL=products.js.map