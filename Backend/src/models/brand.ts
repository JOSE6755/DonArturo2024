import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const BRAND_SCHEMA = {
  brandId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
};

export class Brand extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
  declare brandId: number | null;
  declare name: string;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Brand", timestamps: false };
  }

  static associate(models): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "brandId",
    });
  }
}
