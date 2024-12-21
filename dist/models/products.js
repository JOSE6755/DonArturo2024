"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Product_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.Product_SCHEMA = {
    productId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    code: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    stock: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
};
class Product extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "Product", timestamps: false };
    }
    static associate(models) {
        this.belongsToMany(models.Category, {
            through: models.CategoryProduct,
            foreignKey: "productId",
            otherKey: "categoryId",
            as: "categories",
        });
        this.belongsToMany(models.ShopCart, {
            through: models.ShopCartDetail,
            foreignKey: "productId",
            otherKey: "shopCartId",
            as: "shopCartDetail",
        });
        this.belongsTo(models.Brand, {
            foreignKey: "brandId",
            as: "brand",
        });
        this.belongsTo(models.State, {
            as: "state",
            foreignKey: "stateId",
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=products.js.map