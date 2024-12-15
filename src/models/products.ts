import {
  Association,
  DataTypes,
  ForeignKey,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Brand } from "./brand";
import { Category } from "./category";
import { State } from "./state";
import { db } from "../database/config";
import { CategoryProduct } from "./categoryProduct";
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
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
  //declare brand: NonAttribute<Brand> | null;
  //declare categories: NonAttribute<Category[]> | null;
  //declare state: NonAttribute<State> | null;
  declare static associations: {
    brands: Association<Product, Brand>;
    categories: Association<Product, Category>;
    states: Association<Product, State>;
  };
}

Product.init(
  {
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
  },
  {
    sequelize: db,
    tableName: "Product",
    timestamps: false,
  },
);

Product.belongsToMany(Category, {
  through: CategoryProduct,
  foreignKey: "productId",
  otherKey: "categoryId",
  as: "categories",
});

Product.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brand",
});

Product.belongsTo(State, {
  as: "state",
  foreignKey: "stateId",
});
