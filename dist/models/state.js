"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.STATE_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.STATE_SCHEMA = {
    stateId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
};
class State extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "State", timestamps: false };
    }
    static associate(models) {
        this.hasMany(models.Product, {
            as: "products",
            foreignKey: "stateId",
        });
        this.hasMany(models.User, {
            foreignKey: "stateId",
            as: "users",
        });
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map