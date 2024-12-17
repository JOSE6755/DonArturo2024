"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCart = exports.SHOPCART_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.SHOPCART_SCHEMA = {
    idShopCart: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    creationDate: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    modificationDate: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
};
class ShopCart extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "ShopCart", timestamps: false };
    }
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }
}
exports.ShopCart = ShopCart;
//# sourceMappingURL=shopCart.js.map