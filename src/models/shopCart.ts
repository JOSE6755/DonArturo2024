import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export const SHOPCART_SCHEMA = {
  idShopCart: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  creationDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  modificationDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

export class ShopCart extends Model<InferAttributes<ShopCart>, InferCreationAttributes<ShopCart>> {
  declare idShopCart: number | null;
  declare creationDate: Date | null;
  declare modificationDate: Date | null;
  declare userId: ForeignKey<User["userId"]>;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "ShopCart", timestamps: false };
  }

  static associate(models): void {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
