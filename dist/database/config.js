"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize({
    dialect: "mssql",
    database: process.env.DBNAME || undefined,
    port: Number(process.env.DBPORT) || undefined,
    schema: process.env.SCHEMA_NAME || undefined,
    host: process.env.HOST || "localhost",
    password: process.env.DBPASSWORD || undefined,
    username: "sa",
});
//# sourceMappingURL=config.js.map