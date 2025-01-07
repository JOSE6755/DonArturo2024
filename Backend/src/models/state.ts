import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const STATE_SCHEMA = {
  stateId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
};
export class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
  declare stateId: number | null;
  declare name: string;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "State", timestamps: false };
  }

  static associate(models): void {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "stateId",
    });
    this.hasMany(models.User, {
      foreignKey: "stateId",
      as: "state",
    });
  }
}
