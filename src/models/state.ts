import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../database/config";

export class State extends Model<
  InferAttributes<State>,
  InferCreationAttributes<State>
> {
  declare stateId: number | null;
  declare name: string;
}

State.init(
  {
    stateId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
  },
  { sequelize: db, tableName: "State", timestamps: false },
);
