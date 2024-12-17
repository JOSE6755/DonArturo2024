"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.ROLE_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.ROLE_SCHEMA = {
    roleId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
};
class Role extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "Role", timestamps: false };
    }
    static associate(models) {
        this.hasMany(models.User, {
            foreignKey: "userId",
            as: "users",
        });
    }
}
exports.Role = Role;
//# sourceMappingURL=role.js.map