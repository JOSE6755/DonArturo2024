import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const CLIENT_SCHEMA = {
  clientId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  commercialName: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING(250),
  },
  phoneNumber: {
    allowNull: false,
    type: DataTypes.STRING(8),
  },
  commercialEmail: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
};

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
  declare clientId: number | null;
  declare commercialName: string;
  declare address: string;
  declare phoneNumber: string;
  declare commercialEmail: string;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Client", timestamps: false };
  }

  static associate(models): void {
    this.hasMany(models.User, {
      foreignKey: "clientId",
      as: "users",
    });
  }
}
