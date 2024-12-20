import {
  Association,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Role } from "./role";
import { Client } from "./client";
import { State } from "./state";
import { ShopCart } from "./shopCart";

export const USER_SCHEMA = {
  userId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  names: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  lastNames: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  phoneNumber: {
    allowNull: false,
    type: DataTypes.STRING(8),
  },
  birthDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  creationDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  adress: {
    allowNull: false,
    type: DataTypes.STRING(250),
  },
};

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: number | null;
  declare names: string;
  declare lastNames: string;
  declare email: string;
  declare password: string;
  declare phoneNumber: string;
  declare birthDate: Date;
  declare creationDate: Date | null;
  declare adress: string;
  declare roleId: ForeignKey<Role["roleId"]>;
  declare clientId: ForeignKey<Client["clientId"]> | null;
  declare stateId: ForeignKey<State["stateId"]>;
  declare role: NonAttribute<Role> | null;
  declare client: NonAttribute<Client> | null;
  declare state: NonAttribute<State> | null;
  declare shopCart: NonAttribute<ShopCart> | null;

  declare static associations: {
    role: Association<User, Role>;
    client: Association<User, Client>;
    state: Association<User, State>;
    shopCart: Association<User, ShopCart>;
  };

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Users", timestamps: false };
  }

  static associate(models): void {
    this.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });
    this.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
    this.belongsTo(models.State, {
      foreignKey: "stateId",
      as: "state",
    });
    this.hasOne(models.ShopCart, {
      foreignKey: "idShopCart",
      as: "shopCart",
    });
  }
}
