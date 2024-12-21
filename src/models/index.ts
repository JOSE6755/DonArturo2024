import { Sequelize } from "sequelize";
import { Brand, BRAND_SCHEMA } from "./brand";
import { Category, CATEGORY_SCHEMA } from "./category";
import { State, STATE_SCHEMA } from "./state";
import { Product, Product_SCHEMA } from "./products";
import { CategoryProduct, CATEGORYPRODUCT_SCHEMA } from "./categoryProduct";
import { Client, CLIENT_SCHEMA } from "./client";
import { Role, ROLE_SCHEMA } from "./role";
import { User, USER_SCHEMA } from "./user";
import { ShopCart, SHOPCART_SCHEMA } from "./shopCart";
import { ShopCartDetail, SHOPCARTDETAIL_SCHEMA } from "./shopCartDetail";

export function initModels(sequelize: Sequelize) {
  /*Primero iniciamos los modelos que no dependen de otros
    para asi evitar problemas*/
  Brand.init(BRAND_SCHEMA, Brand.config(sequelize));
  Category.init(CATEGORY_SCHEMA, Category.config(sequelize));
  State.init(STATE_SCHEMA, State.config(sequelize));
  Product.init(Product_SCHEMA, Product.config(sequelize));
  CategoryProduct.init(CATEGORYPRODUCT_SCHEMA, CategoryProduct.config(sequelize));
  Client.init(CLIENT_SCHEMA, Client.config(sequelize));
  Role.init(ROLE_SCHEMA, Role.config(sequelize));
  User.init(USER_SCHEMA, User.config(sequelize));
  ShopCart.init(SHOPCART_SCHEMA, ShopCart.config(sequelize));
  ShopCartDetail.init(SHOPCARTDETAIL_SCHEMA, ShopCartDetail.config(sequelize));

  Brand.associate(sequelize.models);
  Category.associate(sequelize.models);
  State.associate(sequelize.models);
  Product.associate(sequelize.models);
  Client.associate(sequelize.models);
  Role.associate(sequelize.models);
  User.associate(sequelize.models);
  ShopCart.associate(sequelize.models);
}
