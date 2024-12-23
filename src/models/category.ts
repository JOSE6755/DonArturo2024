import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const CATEGORY_SCHEMA = {
  categoryId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
};
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare categoryId: number | null;
  declare name: string;

  static config(db: Sequelize): {
    sequelize: Sequelize;
    tableName: string;
    timestamps: boolean;
  } {
    return { sequelize: db, tableName: "Category", timestamps: false };
  }

  static associate(models): void {
    this.belongsToMany(models.Product, {
      through: models.CategoryProduct,
      foreignKey: "categoryId",
      otherKey: "productId",
      as: "products",
    });
  }
}
