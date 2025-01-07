import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Order } from "./order";
import { State } from "./state";

export const ORDERDETAIL_SCHEMA = {
  orderDetailId: {
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

export class OrderDetail extends Model<InferAttributes<OrderDetail>, InferCreationAttributes<OrderDetail>> {
  declare orderDetailId: number | null;
  declare quantity: number;
  declare price: number;
  declare subTotal: number;
  declare orderId: ForeignKey<Order["orderId"]>;
  declare stateId: ForeignKey<State["stateId"]>;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "OrderDetail", timestamps: false };
  }
}
