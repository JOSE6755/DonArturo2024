"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = exports.BRAND_SCHEMA = void 0;
const sequelize_1 = require("sequelize");
exports.BRAND_SCHEMA = {
    brandId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
};
class Brand extends sequelize_1.Model {
    static config(db) {
        return { sequelize: db, tableName: "Brand", timestamps: false };
    }
    static associate(models) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        this.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandId",
        });
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand.js.map