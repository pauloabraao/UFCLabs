import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
		logging: false,
		charset: "utf8mb4",
		dialectOptions: {
			charset: "utf8mb4",
		},
	}
);

export default db;
