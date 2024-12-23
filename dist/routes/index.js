"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const products_1 = require("./products");
const category_1 = require("./category");
const state_1 = require("./state");
const brand_1 = require("./brand");
const client_1 = require("./client");
const user_1 = require("./user");
const shopCart_1 = require("./shopCart");
const order_1 = require("./order");
const auth_1 = require("./auth");
exports.routes = {
    productsRouter: products_1.router,
    categoryRouter: category_1.router,
    stateRouter: state_1.router,
    brandRouter: brand_1.router,
    clientRouter: client_1.router,
    userRouter: user_1.router,
    shopCartRouter: shopCart_1.router,
    orderRouter: order_1.router,
    authRouter: auth_1.router,
};
//# sourceMappingURL=index.js.map