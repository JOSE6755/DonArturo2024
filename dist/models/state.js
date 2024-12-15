"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
class State extends sequelize_1.Model {
}
exports.State = State;
State.init({
    stateId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
}, { sequelize: config_1.db, tableName: "State", timestamps: false });
//# sourceMappingURL=state.js.map