import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { State } from "./state";

export const ORDER_SCHEMA = {
  orderId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  creationDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare orderId: number | null;
  declare total: number;
  declare creationDate: Date;
  declare userId: ForeignKey<User["userId"]>;
  declare stateId: ForeignKey<State["stateId"]>;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Orders", timestamps: false };
  }
  static associate(models): void {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "orders",
    });
    this.belongsToMany(models.Product, {
      through: models.OrderDetail,
      foreignKey: "orderId",
      otherKey: "productId",
      as: "orderDetail",
    });
  }
}
