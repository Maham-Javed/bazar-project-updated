import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize with PostgreSQL connection for write operations
export const writeDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    retry: { max: 5 },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Initialize Sequelize with PostgreSQL connection for read operations
export const readDB = new Sequelize(
  process.env.READ_DB_NAME,
  process.env.READ_DB_USER,
  process.env.READ_DB_PASS,
  {
    host: process.env.READ_DB_HOST,
    port: process.env.READ_DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    retry: { max: 5 },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// test both DB connections
export const testConnections = async () => {
  try {
    await writeDB.authenticate();
    console.log("Write DB connected");

    await readDB.authenticate();
    console.log("Read DB connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

export default { writeDB, readDB };
