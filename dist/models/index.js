"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = initModels;
const brand_1 = require("./brand");
const category_1 = require("./category");
const state_1 = require("./state");
const products_1 = require("./products");
const categoryProduct_1 = require("./categoryProduct");
const client_1 = require("./client");
const role_1 = require("./role");
const user_1 = require("./user");
const shopCart_1 = require("./shopCart");
function initModels(sequelize) {
    /*Primero iniciamos los modelos que no dependen de otros
      para asi evitar problemas*/
    brand_1.Brand.init(brand_1.BRAND_SCHEMA, brand_1.Brand.config(sequelize));
    category_1.Category.init(category_1.CATEGORY_SCHEMA, category_1.Category.config(sequelize));
    state_1.State.init(state_1.STATE_SCHEMA, state_1.State.config(sequelize));
    products_1.Product.init(products_1.Product_SCHEMA, products_1.Product.config(sequelize));
    categoryProduct_1.CategoryProduct.init(categoryProduct_1.CATEGORYPRODUCT_SCHEMA, categoryProduct_1.CategoryProduct.config(sequelize));
    client_1.Client.init(client_1.CLIENT_SCHEMA, client_1.Client.config(sequelize));
    role_1.Role.init(role_1.ROLE_SCHEMA, role_1.Role.config(sequelize));
    user_1.User.init(user_1.USER_SCHEMA, user_1.User.config(sequelize));
    shopCart_1.ShopCart.init(shopCart_1.SHOPCART_SCHEMA, shopCart_1.ShopCart.config(sequelize));
    brand_1.Brand.associate(sequelize.models);
    category_1.Category.associate(sequelize.models);
    state_1.State.associate(sequelize.models);
    products_1.Product.associate(sequelize.models);
    client_1.Client.associate(sequelize.models);
    role_1.Role.associate(sequelize.models);
    user_1.User.associate(sequelize.models);
    shopCart_1.ShopCart.associate(sequelize.models);
}
//# sourceMappingURL=index.js.map