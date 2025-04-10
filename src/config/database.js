import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    retry: { max: 5 },
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected..."))
  .catch((err) => console.error("DB Connection Error:", err));

export default sequelize;
