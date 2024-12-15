import { Brand } from "./brand";
import { Category } from "./category";
import { CategoryProduct } from "./categoryProduct";
import { Product } from "./products";
import { State } from "./state";

Brand.hasMany(Product, {
  as: "products",
  foreignKey: "brandId",
});

Category.belongsToMany(Product, {
  through: CategoryProduct,
  foreignKey: "categoryId",
  otherKey: "productId",
  as: "products",
});

State.hasMany(Product, {
  as: "products",
  foreignKey: "stateId",
});
