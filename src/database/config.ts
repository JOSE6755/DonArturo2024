import { Sequelize } from "sequelize";
export const db = new Sequelize({
  dialect: "mssql",
  database: process.env.DBNAME || undefined,
  port: Number(process.env.DBPORT) || undefined,
  schema: process.env.SCHEMA_NAME || undefined,
  host: process.env.HOST || "localhost",
  password: process.env.DBPASSWORD || undefined,
  username: "sa",
});
