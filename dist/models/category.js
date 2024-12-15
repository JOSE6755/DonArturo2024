"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    categoryId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
}, { sequelize: config_1.db, tableName: "Category", timestamps: false });
//# sourceMappingURL=category.js.map