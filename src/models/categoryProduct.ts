import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Product } from "./products";
import { Category } from "./category";

export const CATEGORYPRODUCT_SCHEMA = {
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
};
export class CategoryProduct extends Model<
  InferAttributes<CategoryProduct>,
  InferCreationAttributes<CategoryProduct>
> {
  declare categoryProductId: number | null;
  declare productId: ForeignKey<Product["productId"]>;
  declare categoryId: ForeignKey<Category["categoryId"]>;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return {
      sequelize: db,
      tableName: "CategoryProduct",
      timestamps: false,
    };
  }
}
