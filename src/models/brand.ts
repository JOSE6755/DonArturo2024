import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../database/config";

export class Brand extends Model<
  InferAttributes<Brand>,
  InferCreationAttributes<Brand>
> {
  declare brandId: number | null;
  declare name: string;
}

Brand.init(
  {
    brandId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize: db,
    tableName: "Brand",
    timestamps: false,
  },
);
