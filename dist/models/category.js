"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.CATEGORY_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.CATEGORY_SCHEMA = {
    categoryId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
};
class Category extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "Category", timestamps: false };
    }
    static associate(models) {
        this.belongsToMany(models.Product, {
            through: models.CategoryProduct,
            foreignKey: "categoryId",
            otherKey: "productId",
            as: "products",
        });
    }
}
exports.Category = Category;
//# sourceMappingURL=category.js.map