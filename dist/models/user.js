"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.USER_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.USER_SCHEMA = {
    userId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    names: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    lastNames: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    phoneNumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(8),
    },
    birthDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    creationDate: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(250),
    },
};
class User extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "User", timestamps: false };
    }
    static associate(models) {
        this.belongsTo(models.Role, {
            foreignKey: "roleId",
            as: "role",
        });
        this.belongsTo(models.Client, {
            foreignKey: "clientId",
            as: "client",
        });
        this.belongsTo(models.State, {
            foreignKey: "stateId",
            as: "state",
        });
        this.hasOne(models.ShopCart, {
            foreignKey: "idShopCart",
            as: "shopCart",
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map