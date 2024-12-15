import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Product } from "./products";
import { Category } from "./category";
import { db } from "../database/config";

export class CategoryProduct extends Model<
  InferAttributes<CategoryProduct>,
  InferCreationAttributes<CategoryProduct>
> {
  declare categoryProductId: number | null;
  declare productId: ForeignKey<Product["productId"]>;
  declare categoryId: ForeignKey<Category["categoryId"]>;
}
CategoryProduct.init(
  {
    categoryProductId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
    },
    categoryId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
    },
  },
  { sequelize: db, tableName: "CategoryProduct", timestamps: false },
);
