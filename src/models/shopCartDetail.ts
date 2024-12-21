import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { ShopCart } from "./shopCart";
import { Product } from "./products";

export const SHOPCARTDETAIL_SCHEMA = {
  shopCartDetailId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  subTotal: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
};

export class ShopCartDetail extends Model<InferAttributes<ShopCartDetail>, InferCreationAttributes<ShopCartDetail>> {
  declare shopCartDetailId: number | null;
  declare quantity: number;
  declare price: number;
  declare subTotal: number;
  declare shopCartId: ForeignKey<ShopCart["idShopCart"]>;
  declare productId: ForeignKey<Product["productId"]>;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "ShopCartDetail", timestamps: false };
  }
}
