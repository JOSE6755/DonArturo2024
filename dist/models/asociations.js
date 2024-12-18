"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brand_1 = require("./brand");
const category_1 = require("./category");
const categoryProduct_1 = require("./categoryProduct");
const products_1 = require("./products");
const state_1 = require("./state");
brand_1.Brand.hasMany(products_1.Product, {
  as: "products",
  foreignKey: "brandId",
});
category_1.Category.belongsToMany(products_1.Product, {
  through: categoryProduct_1.CategoryProduct,
  foreignKey: "categoryId",
  otherKey: "productId",
  as: "products",
});
state_1.State.hasMany(products_1.Product, {
  as: "products",
  foreignKey: "stateId",
});
//# sourceMappingURL=asociations.js.map
