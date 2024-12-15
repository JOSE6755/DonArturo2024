"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
class Brand extends sequelize_1.Model {
}
exports.Brand = Brand;
Brand.init({
    brandId: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
}, {
    sequelize: config_1.db,
    tableName: "Brand",
    timestamps: false,
});
//# sourceMappingURL=brand.js.map