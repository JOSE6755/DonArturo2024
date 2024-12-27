import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const ROLE_SCHEMA = {
  roleId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
};

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare roleId: number | null;
  declare name: string;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Role", timestamps: false };
  }

  static associate(models): void {
    this.hasMany(models.User, {
      foreignKey: "userId",
      as: "users",
    });
  }
}
