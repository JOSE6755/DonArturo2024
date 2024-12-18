import {
  Association,
  DataTypes,
  ForeignKey,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Brand } from "./brand";
import { Category } from "./category";
import { State } from "./state";

export const Product_SCHEMA = {
  productId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
  updateDate: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },
};
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare productId: number | null;
  declare name: string;
  declare code: string;
  declare stock: number;
  declare price: number;
  declare creationDate: Date | null;
  declare image: string;
  declare updateDate: Date | null;
  declare stateId: ForeignKey<State["stateId"]>;
  declare brandId: ForeignKey<Brand["brandId"]>;
  declare getBrands: HasManyGetAssociationsMixin<Brand>;
  declare getCategories: HasManyGetAssociationsMixin<Category>;
  declare getStates: HasManyGetAssociationsMixin<State>;
  declare brand: NonAttribute<Brand> | null;
  declare categories: NonAttribute<Category[]> | null;
  declare state: NonAttribute<State> | null;
  declare static associations: {
    brands: Association<Product, Brand>;
    categories: Association<Product, Category>;
    states: Association<Product, State>;
  };

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Product", timestamps: false };
  }

  static associate(models): void {
    this.belongsToMany(models.Category, {
      through: models.CategoryProduct,
      foreignKey: "productId",
      otherKey: "categoryId",
      as: "categories",
    });
    this.belongsTo(models.Brand, {
      foreignKey: "brandId",
      as: "brand",
    });
    this.belongsTo(models.State, {
      as: "state",
      foreignKey: "stateId",
    });
  }
}
