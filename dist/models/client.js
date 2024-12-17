"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.CLIENT_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.CLIENT_SCHEMA = {
    clientId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    commercialName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(250),
    },
    phoneNumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(8),
    },
    commercialEmail: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
};
class Client extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "Client", timestamps: false };
    }
    static associate(models) {
        this.hasMany(models.User, {
            foreignKey: "clientId",
            as: "users",
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map